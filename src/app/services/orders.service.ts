import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = 'http://localhost:8080/order'
  constructor(private http:HttpClient) { }

  addOrder(orderDetails){
    return this.http.post(this.baseUrl,orderDetails)
  }

  getPurchasedOrders(customername){
    return this.http.get(this.baseUrl+"/"+customername)
  }
}
