import { Bids } from './Bids';

export class Product{
    product_id:number
    productname:string
    category:string
    description:string
    initialbid:number
    imageurl:string
    sellerid:string
    bids:Object[]
}