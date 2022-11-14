import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any = [];
  allProducts: any = [];
  key: any;
  totalAmount: any = 0;
  item_qty: any;
  isLoading=false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // this.cartService.getProductData().subscribe((res:any)=>{
    //   console.log(res);

    //   this.products=res;
    //   this.allProducts=this.cartService.totalAmount()
    // })
    this.isLoading=true;
    this.cartService.getCartProductData().subscribe((res: any) => {
      if (res) {
        console.log(JSON.parse(JSON.stringify(res)));
        this.key = Object.keys(res) ? Object.keys(res) : 0
        console.log(this.key);
        for (const n in this.key) {
          this.products.push(res[this.key[n]])
          console.log(res[this.key[n]]);
          //calculating total cart value
          this.totalAmount += res[this.key[n]].total;
          this.item_qty = res[this.key[n]].quantity
        }
        this.isLoading=false;
        // this.products=res[key[0]];
        // this.allProducts=this.cartService.totalAmount()

      }

    })


  }

  //remove product from cart

  removeProduct(item: any) {
    this.isLoading=true;
    console.log(this.key[item]);
    this.cartService.deleteCartData(this.key[item]).subscribe((cartItem: any) => {
      console.log(cartItem);
      console.log(this.products[item]);
      console.log(this.products[item].price);
      //removing cart value
      this.totalAmount -= this.products[item].price
      this.products.splice(item, 1);
      console.log(this.products);

      this.cartService.removeCartData(this.products.length);
      this.isLoading=false;
      console.log(this.totalAmount);

    })

  }

  //Increment or decrement of quantity

  decrementQty( index: any) {
    this.isLoading=true;
    if (this.products[index].quantity - 1 < 1) {
      this.products[index].quantity = 1;
      console.log('item_1-> ' + this.products[index].quantity)
    }
    else {
      this.products[index].quantity -= 1;
      this.products[index].total -= this.products[index].price;
      this.totalAmount -= this.products[index].price
      console.log('item_2-> ' + index + '  ' + this.products[index].quantity);
      setTimeout(() => {
        this.cartService.updateCartValue(this.key[index],
          {
            quantity: this.products[index].quantity,
            total: this.products[index].price * this.products[index].quantity
          }
        ).subscribe(resData => {
          this.isLoading=false
        })
      }, 2000);

    }

  }
  incrementQty(index: any) {
    this.isLoading=true;
    console.log(this.key[index])
    this.products[index].quantity += 1
    this.products[index].total += this.products[index].price;
    this.totalAmount += this.products[index].price;
    console.log(this.products[index].quantity);
    setTimeout(() => {
      this.cartService.updateCartValue(this.key[index],
        {
          quantity: this.products[index].quantity,
          total: this.products[index].price * this.products[index].quantity
        }
      ).subscribe(resData => {
        this.isLoading=false;
      })
    }, 2000);

  }


}
