import { HttpClient, HttpParams } from '@angular/common/http';
import { isDelegatedFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartDataList:any=[];
  productList:any=new BehaviorSubject<any>(0);

  constructor(private http:HttpClient) {}

  getProductData(){
    return this.productList.asObservable();
  }

  setProduct(product:any){
    this.cartDataList.push(...product);
    this.productList.next(product)
  }

  //Add product into cart
  addToCart(product:any){
    // this.cartDataList.push(product);
    this.http.post(environment.productUrl + 'cart.json',product).subscribe(prod=>{
      // this.cartDataList.push(prod)
      console.log(prod);
      
      let productLength=0
      this.getProductData().subscribe((res:any)=>{
        console.log(res);
         productLength=res
      });
      this.productList.next(Number(productLength)+1);
      // this.totalAmount();
    })
    
  }

  //Get cart product
  getCartProductData(){
    return this.http.get(environment.productUrl + 'cart.json').pipe(
      retry(1)
    )
  }

  // totalAmount():number{
  //   let grandTotal=0;
  //   this.cartDataList.map((amnt:any)=>{
  //     console.log(amnt);
      
  //     grandTotal+=amnt.total;
  //   })
  //   return grandTotal;
  // }

  removeCartData(product_index:any){
    console.log(product_index);
    // console.log(this.cartDataList);
    
    // // this.cartDataList.map((amnt:any,index:any)=>{
    // //   console.log(amnt,index);
      
    //   // if(product.id === amnt.id){
    //     this.cartDataList.splice(product_index,1)
    //   // }
    // // })
    // console.log(this.cartDataList);
    
    this.productList.next(product_index)
  }


  removeAllCartData(){
    this.cartDataList=[];
    this.productList.next(this.cartDataList)
  }

  //update cart value
  updateCartValue(id:any,data:any){
    return this.http.patch(environment.productUrl + 'cart/' + id + '.json',data,{
      params: new HttpParams().set('name', id) 
    }).pipe(
      retry(1)
    )
  }

  //product delete from cart
  deleteCartData(id:any){
    return this.http.delete(environment.productUrl + 'cart/' +id+ '.json',{
      params: new HttpParams().set('name', id)}).pipe(
      retry(1)
    )
  }

  //getting product by id
  getProductDetailsById(id:any){
    return this.http.get(environment.productUrl + 'product/' + id + '.json').pipe(
      retry(1)
    )

  }
}
