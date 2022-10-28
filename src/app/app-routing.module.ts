import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  {path:'',redirectTo:'auth/login',pathMatch:'full'},
  {path:'auth',loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)},
  {path:'user',loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule)},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
