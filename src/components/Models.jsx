export const cart = {
    
        cartId:any,
        userId:any,
        productId:any,
        quantity:any,
        price:any

}

export const CartItem = {
     productId: any,
     productName: '',
     productDesc: '',
     price: '',
     quantity: '',

    constructor(productId,productName,productDesc,discount,price){
        
    }
}

export const Products = {
     productId: number, 
     productName: string,
     productDesc: string,
     stockQuantity: number,
     discount: number,
     price: number,
     ratings : number,
     imageUrl : string,

    constructor(productId,productName,productDesc,stockQuantity,discount,price,ratings,imageUrl){
        
    }


}