import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub!: Subscription;
  isAuthenticated = false;
  private quantity!: Subscription;
  cart_quantity: number = 0;
  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userData')) {
      this.isAuthenticated = true
    }
    this.cartService.getProductData().subscribe((response: any) => {
      console.log(response);
      
      this.cart_quantity = response;
    })
    this.cartService.getCartProductData().subscribe((res: any) => {
      console.log(res);
      
      if(res!=null){
        this.cartService.productList.next(Object.keys(res).length? Object.keys(res).length: 0);
        this.cartService.getProductData().subscribe((response: any) => {
          this.cart_quantity = response;
        })
      }
      
    })

    // this.quantity = this.authService.cartQuantity.subscribe((quant: number) => {
    //   this.cart_quantity = quant
    // })
  }

  ngOnDestroy(): void {
    // this.userSub.unsubscribe();
    // this.quantity.unsubscribe();
  }

  onLogout() {
    // this.authService.logout();
    localStorage.removeItem('userData')
    localStorage.removeItem('userToken')
    this.router.navigate(['/auth/login'])
  }

}
