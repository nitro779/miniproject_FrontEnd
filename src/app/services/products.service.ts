import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../home/User';
import { Product } from '../main/product';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  editProduct(product: any) {
    return this.http.put('http://localhost:8080/products',product)
  }

  constructor(private http:HttpClient, private authenticator:AuthenticationService) { }

  getProducts(seller){
    return this.http.get<Product[]>('http://localhost:8080/products/'+seller)
  }

  getSellerProducts(seller){
    return this.http.get<Product[]>('http://localhost:8080/myproducts/'+seller)
  }

  deleteProduct(product){
    return this.http.delete('http://localhost:8080/products/'+product)
  }

  getProductById(product_id){
    return this.http.get<Product>('http://localhost:8080/productby/'+product_id)
  }

  acceptBid(bid){
    return this.http.post('http://localhost:8080/products/accept',bid)
  }

}
