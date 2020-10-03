import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MyinterceptorService implements HttpInterceptor{

  constructor(private authenticator:AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authenticator.isUserLoggedIn() && req.url.indexOf('login')==-1){
      const myReq = req.clone({
          headers : new HttpHeaders({
            'Authorization' : sessionStorage.getItem('token')
          })
        });
      return next.handle(myReq)
    }else{
      return next.handle(req)
    }
  }
}
