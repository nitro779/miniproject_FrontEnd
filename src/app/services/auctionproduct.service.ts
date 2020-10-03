import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../main/product';

@Injectable({
  providedIn: 'root'
})
export class AuctionproductService {

  constructor(private http:HttpClient) { }

  auctionProduct(product:Product){
    return this.http.post('http://localhost:8080/products',product);
  }
}
