import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any=FormGroup;
  isLoginMode=true;
  isLoading=false;
  error:string='';

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode
  }

  onSubmit(){
    console.log(this.loginForm.value);
    //Checking the login form valid or not,extra check
    if(!this.loginForm.valid){
      return;
    }
    //anyone of observable value store on this variable
    let authObs:Observable<AuthResponseData>
    //Checking login mode
    this.isLoading=true;
    if(this.isLoginMode){
     authObs=this.authService.login(this.loginForm.value.email,this.loginForm.value.password)
    }else{

      authObs=this.authService.signup(this.loginForm.value.email,this.loginForm.value.password)
    }

    authObs.subscribe(resData=>{
      console.log(resData);
      this.isLoading=false;
      this.router.navigate(['user/home'])
      
     },errorMessage=>{
      console.log(errorMessage);
      this.error=errorMessage;
      this.isLoading=false;
      
     })
    this.loginForm.reset()
    
  }

}
