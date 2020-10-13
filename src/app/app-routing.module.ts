import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main/main.component';
import {WelcomeComponent} from './home/welcome/welcome.component';
import {LoginComponent} from './home/login/login.component';
import {RegisterComponent} from './home/register/register.component';
import {ProductslistComponent} from './main/productslist/productslist.component';
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
import { ForgotpasswordComponent } from './home/forgotpassword/forgotpassword.component';

const routes: Routes = [
  {
    path: 'home' , component: HomeComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'forgotpassword',component:ForgotpasswordComponent},
      {path: '', component: WelcomeComponent}
    ],
    canActivate:[Routeguard2Service]
  },
  {path: 'app', component: MainComponent,
    children: [
      {path: '', component: ProductslistComponent},
      {path: 'products', component: ProductslistComponent,runGuardsAndResolvers:"always"},
      {path: 'mybids', component: ViewbidsComponent,runGuardsAndResolvers:"always"},
      {path: 'myauctions', component: MyauctionsComponent,runGuardsAndResolvers:"always"},
      {path: 'sellproduct', component: SellproductComponent},
      {path:'bid/:id',component:BiddingComponent},
      {path:'payment/bid/:id',component:PaymentComponent},
      {path:'payment-success',component:PaymentSuccessComponent},
      {path:'purchased',component:PurchasedDetailsComponent,runGuardsAndResolvers:"always"},
      {path:"sold",component:SoldDetailsComponent,runGuardsAndResolvers:"always"},
      {path: '**', component: PagenotfoundComponent,runGuardsAndResolvers:"always"}
    ],
      canActivate: [RouterguardService]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full',canActivate:[Routeguard2Service] },
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
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
  ForgotpasswordComponent,
  ProductslistComponent,
  ViewbidsComponent,
  MyauctionsComponent,
  SellproductComponent,
  PaymentSuccessComponent,
  PurchasedDetailsComponent,
  SoldDetailsComponent
];
