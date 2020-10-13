import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationCancel, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { BiddingService } from 'src/app/services/bidding.service';
import { CardDetailsService } from 'src/app/services/card-details.service';
import { OrdersService } from 'src/app/services/orders.service';

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
  savedCards
  constructor(private activatedRoute:ActivatedRoute,private bidsService:BiddingService,
    private router:Router,private builder:FormBuilder,private cardService:CardDetailsService,
    private ordersService:OrdersService,private apiService:ApiService) { }

  ngOnInit(): void {
    this.fetchData()
    this.cardDetails = this.builder.group({
      cardholder : ['',[Validators.required]],
      cardnumber : ['',[Validators.required]],
      month : ['',[Validators.required]],
      year : ['',[Validators.required]],
      cvv : ['',[Validators.required]],
      save : [''],
      customer_id:['']
      }
    )
  }

  placeOrder(bid){
    if(this.cardDetails.get('save').value){
      this.cardDetails.patchValue({month:parseInt(this.cardDetails.get('month').value)})
      this.cardDetails.patchValue({year:parseInt(this.cardDetails.get('year').value)})
      this.cardDetails.patchValue({customer_id:bid.customer_id})
      this.apiService.saveCardDetails(this.cardDetails.value).subscribe(
        data => {
          console.log(data)
        }
      )
    }
    this.orderDetails['order_date'] = Date.now()
    this.orderDetails['price'] = this.bid.bidval
    this.orderDetails['customer_id'] = this.bid.customer_id
    this.createOrderDetails(bid.product)
    console.log(this.orderDetails)
    this.apiService.addOrderDetails(this.orderDetails).subscribe(
      data => {
        console.log(data)
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
    this.orderDetails['product_id'] = product.pid
    this.orderDetails['product_name'] = product.productname
    this.orderDetails['category'] = product.category
    this.orderDetails['product_image'] = product.image
    this.orderDetails['seller_id'] = product.seller_id
  }

  setCardDetails(card){
    this.cardDetails.patchValue(card)
  }

  fetchData(){
    this.bidId = (this.activatedRoute.snapshot.paramMap.get('id'))
    this.apiService.getBidByBidId(this.bidId).subscribe(
      data => {
        this.bid = data
        this.apiService.getProductByProductId(this.bid['product_id']).subscribe(
          data => {
            this.bid['product'] = data
          }
        )
      }
    )
    this.apiService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        this.apiService.getCardDetailsByCustomer(data).subscribe(
          data => {
            console.log(data)
            this.savedCards = data
          }
        )
      }
    )
  }
}
