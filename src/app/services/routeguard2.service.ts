import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class Routeguard2Service implements CanActivate{

  constructor(private authenticator:AuthenticationService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(!this.authenticator.isUserLoggedIn()){
      return true
    }else{
      this.router.navigate(['/app'])
      return false
    }
  }
}