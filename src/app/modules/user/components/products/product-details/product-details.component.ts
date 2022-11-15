import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDetails:any;
  constructor(private actiRoute:ActivatedRoute,private cartService:CartService) { }

  ngOnInit(): void {
    const prodId=this.actiRoute.snapshot.params
    console.log(prodId.id);
    this.cartService.getProductDetailsById(prodId.id).subscribe(data=>{
      console.log(data);
      if(data){
        this.productDetails=data;

      }
      
    })
  }

}
