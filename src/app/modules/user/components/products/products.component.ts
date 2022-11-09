import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productForm!:FormGroup;

  constructor(private fb:FormBuilder,private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.productForm=this.fb.group({
      product_name:[''],
      description:[''],
      price:[],
      size:[''],
      imagePath:['']
    })
  }

  onAddProduct(){
    console.log(this.productForm.value);
    this.productService.addProduct(this.productForm.value).subscribe(resData=>{
      console.log(resData);
      this.router.navigate(['user/home'])
    })

  }
}
