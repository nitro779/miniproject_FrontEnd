import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main/main.component';
import {WelcomeComponent} from './home/welcome/welcome.component';
import {LoginComponent} from './home/login/login.component';
import {RegisterComponent} from './home/register/register.component';
import {ProductslistComponent} from './main/productslist/productslist.component';
import {combineAll} from 'rxjs/operators';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {ViewbidsComponent} from './main/viewbids/viewbids.component';
import {MyauctionsComponent} from './main/myauctions/myauctions.component';
import {SellproductComponent} from './main/sellproduct/sellproduct.component';
import { RouterguardService } from './services/routerguard.service';
import { Routeguard2Service } from './services/routeguard2.service';
import { BiddingComponent } from './main/bidding/bidding.component';
import { PaymentComponent } from './main/payment/payment.component';
import { PaymentSuccessComponent } from './main/payment-success/payment-success.component';
import { PurchasedDetailsComponent } from './main/purchased-details/purchased-details.component';
import { SoldDetailsComponent } from './main/sold-details/sold-details.component';

const routes: Routes = [
  {
    path: 'home' , component: HomeComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '', component: WelcomeComponent}
    ],
    canActivate:[Routeguard2Service]
  },
  {path: 'app', component: MainComponent,
    children: [
      {path: '', component: ProductslistComponent},
      {path: 'products', component: ProductslistComponent},
      {path: 'mybids', component: ViewbidsComponent},
      {path: 'myauctions', component: MyauctionsComponent},
      {path: 'sellproduct', component: SellproductComponent},
      {path:'bid/:id',component:BiddingComponent},
      {path:'payment/bid/:id',component:PaymentComponent},
      {path:'payment-success',component:PaymentSuccessComponent},
      {path:'purchased',component:PurchasedDetailsComponent},
      {path:"sold",component:SoldDetailsComponent},
      {path: '**', component: PagenotfoundComponent}
    ],
      canActivate: [RouterguardService]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full',canActivate:[Routeguard2Service] },
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routesList = [HomeComponent,
  WelcomeComponent,
  MainComponent,
  LoginComponent,
  RegisterComponent,
  WelcomeComponent,
  PagenotfoundComponent,
  ProductslistComponent,
  ViewbidsComponent,
  MyauctionsComponent,
  SellproductComponent,
  PaymentSuccessComponent,
  PurchasedDetailsComponent,
  SoldDetailsComponent
];
