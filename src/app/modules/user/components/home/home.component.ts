import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/shared/auth.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService,private prodService:ProductService) { }

  counter:number=0;
  prod:Product[]=[]
  ngOnInit(): void {
    this.prodService.fetchProduct()
  }
  addToCart(){
    this.counter++;
    console.log(this.counter);
    this.authService.cartQuantity.next(this.counter)
    

  }

}
