export class Product{
    public product_name!: string;
    description!:string;
    price!:number;
    size?:string;
    imagePath!:string;
   

    constructor(pname:string,desc:string,price:number,size:string,imagePath:string){
       this.product_name=pname;
       this.description=desc;
       this.price=price;
       this.size=size
       this.imagePath=imagePath;

    }
}