import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products:any=[];
  allProducts:any=[];

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.getProductData().subscribe((res:any)=>{
      console.log(res);
      
      this.products=res;
      this.allProducts=this.cartService.totalAmount()
    })
    
  }

  removeProduct(item:any){
    this.cartService.removeCartData(item);
  }
  removeAllCartData(){
    this.cartService.removeAllCartData();
  }

}
