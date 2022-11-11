import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(take(1),exhaustMap((user:any)=>{
      if(!user){
        return next.handle(request)
      }
      const modifiedReq=request.clone({params:new HttpParams().set('auth',user.token)})
      console.log(modifiedReq);
      
      return next.handle(modifiedReq);
    }))
  }
}
