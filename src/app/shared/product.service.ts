import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Product} from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productSelected=new Subject<Product>();

  constructor(private http:HttpClient) { }

  private product:Product[]=[
    // new Product('T-Shirt',
    // 'Pure Cotton T-Shirt with machine wash',
    // 600,'M',
    // 'https://unsplash.com/photos/PNsj6RiHAF4'  
    // ),
    // new Product('Shirt',
    // 'Pure Cotton-blend Shirt with machine wash',
    // 800,'M',
    // 'https://pixabay.com/images/id-2947548/'  
    // ),
    // new Product('Jeans',
    // 'Pure Denim Jeans with machine wash',
    // 1100,'30',
    // 'https://pixabay.com/images/id-4050815/'  
    // ),
    // new Product('Shoe',
    // 'Branded shoe',
    // 2000,'40',
    // 'https://pixabay.com/images/id-4050815/'  
    // )
  ];

  getProducts(){
    return this.product.slice();
  }
  getProductById(id:number){
    return this.product[id]
  }

  addProduct(data:{product_name:string,description:string,price:number,size:string,imagePath:string}){
    return this.http.post<{product_name:string}>(environment.productUrl + 'product.json',data).pipe(
      retry(1)
    )
  }

  fetchProduct(){
    //Added generic type
    return this.http.get<{[key:string]:Product}>(environment.productUrl + 'product.json').pipe(
      retry(1)
    )
  }
  removeProduct(id:any){
    return this.http.delete<{[key:string]:Product}>(environment.productUrl + 'product/'+id+'.json',{
      params: new HttpParams().set('name', id)
  }).pipe(
      retry(1)
    )
  }
}
