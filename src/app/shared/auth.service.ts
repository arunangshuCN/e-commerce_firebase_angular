import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { catchError, tap} from 'rxjs/operators'
import { throwError} from 'rxjs'
import { User } from '../models/user.model';
export interface AuthResponseData{
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered?:	boolean;
  usertype?:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any=new BehaviorSubject<any>(null)
  token:string='';
  cartQuantity:any= new BehaviorSubject<number>(0);

  constructor(private http:HttpClient) { }

  signup(email:string,password:string){
    return this.http.post<AuthResponseData>(environment.apiUrl + ':signUp?key='+environment.apiKey,
    {
      email:email,
      password:password,
      returnSecureToken:true,
    })
    //tap is a operator which is used without using the changes of response,its just run some code from observable
    .pipe(catchError(this.handleError),tap(resData=>{
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
    }))
    
  }


  //For login
  login(email:string,password:string){
    return this.http.post<AuthResponseData>(environment.apiUrl + ':signInWithPassword?key=' + environment.apiKey,
    {
      email:email,
      password:password,
      returnSecureToken:true,
    }).pipe(catchError(this.handleError),tap(resData=>{
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
    }))
  }

  autoLogin(){
    const userData:any=localStorage.getItem('userToken');
    if(!userData){
      return;
    }
    const loadedUser=new User(userData.email,userData.id,userData.token,new Date(userData.tokenExpirationData));
    if(loadedUser.getToken){
      this.user.next(loadedUser)
    }
  }

  logout(){
    this.user.next(null)
  }

  //Handle the authentication
  private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
    const expirationDate=new Date(
      new Date().getTime() + expiresIn *1000
    );
    const user=new User(
    email,
    userId,
    token,
    expirationDate
    )
    this.user.next(user)
    localStorage.setItem('userData',JSON.stringify(user));
    localStorage.setItem('userToken',JSON.stringify(user.token))
  }


//handle the error observable
  private handleError(errorRes:HttpErrorResponse){
    let errorMessage='An unknown error occured!'; //error observable
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage)
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS' :
          errorMessage='The email exists already!'
          break;
        case 'EMAIL_NOT_FOUND' :
          errorMessage='The email is invalid!'
          break;
        case 'INVALID_PASSWORD' :
          errorMessage='Invalid Password!'
          break;
      }
      return throwError(errorMessage)
  }
}
