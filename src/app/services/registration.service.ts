import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../home/User';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  registerUser(user:User){
    const body = JSON.stringify(user)
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post('http://localhost:8080/register',body,{headers:headers})
  }
}
