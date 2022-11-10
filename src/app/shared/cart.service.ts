import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartDataList:any=[];
  productList:any=new BehaviorSubject<any>([]);

  constructor(private http:HttpClient) { }

  getProductData(){
    return this.productList.asObservable();
  }

  setProduct(product:any){
    this.cartDataList.push(...product);
    this.productList.next(product)
  }

  addToCart(product:any){
    this.cartDataList.push(product);
    // this.http.post(environment.productUrl + 'cart.json',product).subscribe(prod=>{
    //   this.cartDataList.push(prod)
    //   console.log(this.cartDataList);
      
    // })
    this.productList.next(this.cartDataList);
    this.totalAmount();
    console.log(this.cartDataList);
    
  }

  totalAmount():number{
    let grandTotal=0;
    this.cartDataList.map((amnt:any)=>{
      grandTotal+=amnt.total;
    })
    return grandTotal;
  }

  removeCartData(product:any){
    this.cartDataList.map((amnt:any,index:any)=>{
      if(product.id === amnt.id){
        this.cartDataList.splice(index,1)
      }
    })
    this.productList.next(this.cartDataList)
  }
  removeAllCartData(){
    this.cartDataList=[];
    this.productList.next(this.cartDataList)
  }
}
