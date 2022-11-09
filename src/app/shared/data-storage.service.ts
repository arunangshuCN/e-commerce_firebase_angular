import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private productService:ProductService, private http:HttpClient) { }

  // storeProduct(){
  //   const product=this.productService.getProducts();
  //   this.http.put(environment.productUrl + 'products.json',product).pipe(
  //     retry(1)
  //   )
  // }
}
