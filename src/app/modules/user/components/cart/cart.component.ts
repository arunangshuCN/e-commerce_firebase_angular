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
  key:any;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    // this.cartService.getProductData().subscribe((res:any)=>{
    //   console.log(res);
      
    //   this.products=res;
    //   this.allProducts=this.cartService.totalAmount()
    // })

    this.cartService.getCartProductData().subscribe((res:any)=>{
      if(res){
        console.log(JSON.parse(JSON.stringify(res)));
        this.key=Object.keys(res)?Object.keys(res):0
        console.log(this.key);
        for (const n in this.key) {        
          this.products.push(res[this.key[n]])
        }
        // this.products=res[key[0]];
        this.allProducts=this.cartService.totalAmount()

      }
      
    })
    
  }

  removeProduct(item:any){
    console.log(this.key[item]);
    this.cartService.deleteCartData(this.key[item]).subscribe((cartItem:any)=>{
      console.log(cartItem);
      console.log(this.products[item]);
      this.products.splice(item,1);
      console.log(this.products);
      
      this.cartService.removeCartData(this.products.length);
    })
    
  }
  // removeAllCartData(){
  //   this.cartService.removeAllCartData();
  // }

}
