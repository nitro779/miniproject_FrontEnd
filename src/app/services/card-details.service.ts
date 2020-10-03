import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  baseUrl = "http://localhost:8080/cards"

  constructor(private http:HttpClient) { }

  saveCardDetails(cardDetails){
    return this.http.post(this.baseUrl,cardDetails)
  }
}
