import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private username;
  private password;
  private AUTH_TOKEN = 'authenticatedUser'
  private TOKEN = 'token'

  constructor(private http: HttpClient,private router: Router) { }

  login(username,password){
    const token = this.createBasicAuthToken(username,password)
    return this.http.get('http://localhost:8080/users/login',{headers:{Authorization:token}}).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
      this.router.navigate(['/app'])
    }));
  }

  registerSuccessfulLogin(username,password){
    sessionStorage.setItem(this.AUTH_TOKEN,username)
    sessionStorage.setItem(this.TOKEN,this.createBasicAuthToken(username,password))
  }

  isUserLoggedIn(){
    if(sessionStorage.getItem(this.AUTH_TOKEN)){
      return true
    }else{
      return false
    }
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  logout() {
    sessionStorage.removeItem(this.AUTH_TOKEN);
    this.username = null;
    this.password = null;
    this.router.navigate(['home/login'])
  }

  getHeaders(){
    return new HttpHeaders({
      'Authorization': this.createBasicAuthToken(this.username,this.password)
    })
  }

}
