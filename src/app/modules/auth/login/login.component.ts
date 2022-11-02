import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any=FormGroup;
  isLoginMode=true;

  constructor(private fb:FormBuilder) { }

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
    this.loginForm.reset()
    
  }

}
