import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-purchased-details',
  templateUrl: './purchased-details.component.html',
  styleUrls: ['./purchased-details.component.css']
})
export class PurchasedDetailsComponent implements OnInit,OnDestroy {

  isEmpty
  totalMoney
  orders
  customer_id
  constructor(private http:HttpClient,private ordersService:OrdersService,private apiService:ApiService) { }

  ngOnInit(): void {
    this.getAllOrders()
  }

  ngOnDestroy() {
    
  }

  loading(){
    console.log("loading")
  }

  dataFetched(){
    console.log("Data Has been fetched")
  }

  getAllOrders(){
    this.apiService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        this.customer_id = data
        this.apiService.getPlacedOrders(data).subscribe(
          data => {
            console.log(data)
            if(data.length === 0){
              console.log("No orders There.")
              this.isEmpty = true
              this.orders=new Array()
            }else{
              this.orders = data
              this.totalMoney = 0
              for (const iterator of this.orders) {
                this.isEmpty = false
                this.totalMoney+=iterator['price']
                let seller_id = iterator['seller_id']
                this.apiService.getUserNameById(seller_id).subscribe(
                  data => {
                    iterator['seller_name'] = data['username']
                  }
                )
              }
              console.log(this.totalMoney)
            }
          }
        )
      }
    )
  }

  getSortedOrders(sortBy){
    this.totalMoney=0
    this.apiService.getOrders(sortBy,this.customer_id).subscribe(
      data => {
        this.orders = data
        console.log(data)
        for (const iterator of this.orders) {
          this.totalMoney+=iterator['price']
          let seller_id = iterator['seller_id']
          this.apiService.getUserNameById(seller_id).subscribe(
          data => {
              iterator['seller_name'] = data['username']
              }
            )
          }
      }
    )
  }

}
