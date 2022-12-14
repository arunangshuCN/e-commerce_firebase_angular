import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/shared/auth.service';
import { CartService } from 'src/app/shared/cart.service';
import { ProductService } from 'src/app/shared/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService,
    private prodService:ProductService,
    private cartService:CartService,
    private router:Router,
    
    ) { }

  counter:number=0;
  prod:Product[]=[];
  error:any=null;
  isLoading=false;

  ngOnInit(){
    this.isLoading=true;
    this.prodService.fetchProduct().pipe(map((resData:any)=>{
      const productArray:Product[]=[];
      for(const key in resData){
        if(resData.hasOwnProperty(key)){
          productArray.push({...resData[key],id:key})
        }
      }
      return productArray
    })).subscribe(product=>{
      console.log(product);
      this.prod=product;
      this.prod.forEach((res:any)=>{
        Object.assign(res,{quantity:1,total:res.price})
      })
      this.isLoading=false;
      
    },(error:Error)=>{
      this.error=error.message
    })
  }


  addToCart(item:any,id:any){
    console.log(item);
    console.log(id);
    this.cartService.addToCart(item)
    
    // this.cartService.addToCart(item);
    // this.counter++;
    // console.log(this.counter);
    // this.authService.cartQuantity.next(this.counter)
    

  }

  onDelete(id:any){
    console.log(id);
    console.log(this.prod);
    this.prodService.removeProduct(id).subscribe(result=>{
      console.log(result);
     
      
      const index=this.prod.indexOf(id)
      this.prod.splice(index,1)
    })

  }

  productDetails(id:any){
    console.log(id);
    this.router.navigate(['user/product/'+id])
    
  }

}
