import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import { User } from '../home/User';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  private baseUrl = 'http://localhost:8080/register';
  data;
  constructor(private http: HttpClient) { }

  registerUser(user: User):Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(user);
    return this.http.post(this.baseUrl, body,{'headers':headers})
  }

}
