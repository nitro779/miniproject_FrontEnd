import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationCancel, Router } from '@angular/router';
import { range } from 'rxjs';
import { BiddingService } from 'src/app/services/bidding.service';
import { CardDetailsService } from 'src/app/services/card-details.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Product } from '../product';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
  year = this.generateYear()
  bid
  bidId
  orderDetails={}
  cardDetails
  constructor(private activatedRoute:ActivatedRoute,private bidsService:BiddingService,
    private router:Router,private builder:FormBuilder,private cardService:CardDetailsService,
    private ordersService:OrdersService) { }

  ngOnInit(): void {
    this.bidId = (this.activatedRoute.snapshot.paramMap.get('id'))
    this.bidsService.getBidsById(this.bidId).subscribe(
      data => {
        if(data == null){
          this.router.navigate(['/app'])
        }else{
          this.bid = data
          if(this.bid.status != true){
            this.router.navigate(['/app'])
          }
          console.log(this.bid)
        } 
      }
    )
    this.cardDetails = this.builder.group({
      cardholdername : ['',[Validators.required]],
      cardnumber : ['',[Validators.required]],
      month : ['',[Validators.required]],
      year : ['',[Validators.required]],
      cvv : ['',[Validators.required]],
      save : ['']
      }
    )
  }

  placeOrder(bid){
    if(this.cardDetails.get('save').value){
      let details = this.cardDetails.value
      details['month'] = parseInt(details['month'])
      details['year'] = parseInt(details['year'])
      details['customer'] = bid.customer
      this.cardService.saveCardDetails(this.cardDetails.value).subscribe(
        data => {
          console.log("Saved Card Successfully")
       }
      )
    }
    this.orderDetails['order_date'] = Date.now()
    this.orderDetails['price'] = this.bid.bidval
    this.orderDetails['customer'] = this.bid.customer
    this.orderDetails['bidding_id'] = this.bid.biddingid
    this.createOrderDetails(bid.product)
    this.ordersService.addOrder(this.orderDetails).subscribe(
      data => {
        this.router.navigate(['app/payment-success'])
      }
    )
  }

  generateYear(){
    let i=2021
    let l = []
    while(i<2040){
      l.push(i)
      i++
    }
    return l
  }

  createOrderDetails(product){
    this.orderDetails['productid'] = product.product_id
    this.orderDetails['productname'] = product.productname
    this.orderDetails['category'] = product.category
    this.orderDetails['imageurl'] = product.imageurl
    this.orderDetails['description'] = product.description
    this.orderDetails['seller'] = product.seller
  }
}
