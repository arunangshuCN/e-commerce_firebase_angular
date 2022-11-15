export class User{
    constructor(
        public email:string,
        public id:string,
        public token:string,
        public tokenExpirationdate:Date,
    ){}

    get getToken(){
        if(!this.tokenExpirationdate || new Date() > this.tokenExpirationdate){
            return null;
        }
        return this.token;
    }
}