import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BiddingModel } from '../main/biddingmodel';
import { Bids } from '../main/Bids';

@Injectable({
  providedIn: 'root'
})
export class BiddingService {

  constructor(private http:HttpClient) { }

  bidProduct(model:BiddingModel){
    return this.http.post('http://localhost:8080/bids',model)
  }

  viewMyBids(user){
    return this.http.get<Bids[]>('http://localhost:8080/mybids/'+user)
  }

  getBidsByProductId(product_id: any): any {
    return this.http.get<Bids[]>('http://localhost:8080/bids/product/'+product_id)
  }

  getBidsById(id){
    return this.http.get('http://localhost:8080/bids/bid/'+id)
  }
}
