import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../main/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  usersBaseUrl = "http://localhost:8080/users"
  productsBaseUrl = "http://localhost:8080/products"
  bidsBaseUrl = "http://localhost:8080/bids"
  cardDetailsBaseUrl = "http://localhost:8080/cards"
  ordersBaseUrl = "http://localhost:8080/orders"
  constructor(private http:HttpClient) { }

  registerUser(user){
    const body = JSON.stringify(user)
    console.log(user)
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post(this.usersBaseUrl+"/register",body,{headers:headers})
  }

  getUserId(username){
    return this.http.get<any>(this.usersBaseUrl+"/"+username)
  }

  addProduct(product){
    return this.http.post(this.productsBaseUrl+"/add",product)
  }

  getProducts(username){
    return this.http.get<any>(this.productsBaseUrl+"/all/"+username)
  }

  getUserNameById(id):Observable<any>{
    return this.http.get<any>(this.usersBaseUrl+"/username/"+id)
  }

  getUserProducts(username){
    return this.http.get<any>(this.productsBaseUrl+"/my/"+username)
  }

  getProductByProductId(id){
    return this.http.get<Product>(this.productsBaseUrl+"/product/"+id)
  }

  addBidForProduct(bid){
    const body = JSON.stringify(bid)
    console.log(bid)
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post(this.bidsBaseUrl+"/add",bid,{headers:headers})
  }

  getBidsReceivedForProduct(uid){
    return this.http.get<any>(this.bidsBaseUrl+"/received/"+uid)
  }

  getBidsPlaced(cid){
    return this.http.get<any>(this.bidsBaseUrl+"/placed/"+cid)
  }

  acceptBid(bid_id){
    return this.http.post(this.bidsBaseUrl+"/accept/"+bid_id,[])
  }

  getBidByBidId(bid_id){
    return this.http.get<any>(this.bidsBaseUrl+"/get/"+bid_id)
  }

  saveCardDetails(cardDetails){
    console.log(cardDetails)
    return this.http.post(this.cardDetailsBaseUrl+"/add",cardDetails)
  }

  getCardDetailsByCustomer(customerId){
    return this.http.get<any>(this.cardDetailsBaseUrl+"/get/"+customerId)
  }

  addOrderDetails(order){
    return this.http.post(this.ordersBaseUrl+"/add",order)
  }

  getPlacedOrders(customer_id){
    return this.http.get<any[]>(this.ordersBaseUrl+"/placed/"+customer_id)
  }

  getReceivedOrders(seller_id){
    return this.http.get<any>(this.ordersBaseUrl+"/received/"+seller_id)
  }

  getOrders(sortType,customer_id){
    return this.http.get<any>(this.ordersBaseUrl+"/placed/"+sortType+"/"+customer_id)
  }

  forgotPassword(username){
    return this.http.get<any>(this.usersBaseUrl+"/forgot/"+username)
  }
}
