import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/materials/material/material.module';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  }
  
]

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class AuthModule { }
