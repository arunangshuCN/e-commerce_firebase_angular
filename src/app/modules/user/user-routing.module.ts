import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:'',component:UserDashboardComponent,
    children:[
      {path:'home',component:HomeComponent},
      {path:'',component:ProductsComponent},
      {path:'product-add',component:ProductsComponent},
      {path:'product/:id',component:ProductDetailsComponent},
      {path:'cart',component:CartComponent},
      {path:'',redirectTo:'user/home',pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
