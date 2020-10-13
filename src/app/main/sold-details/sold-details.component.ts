import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-sold-details',
  templateUrl: './sold-details.component.html',
  styleUrls: ['./sold-details.component.css']
})
export class SoldDetailsComponent implements OnInit {

  orders: any
  totalMoney = 0
  isEmpty
  userId
  constructor(private http: HttpClient, private ordersService: OrdersService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchData()
  }
  fetchData() {
    this.apiService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        this.apiService.getReceivedOrders(data).subscribe(
          data => {
            console.log(data)
            this.orders = data
            this.isEmpty = this.orders.length === 0
            for (const iterator of this.orders) {
              this.totalMoney += iterator['price']
              console.log(this.totalMoney)
              let customer_id = iterator['customer_id']
              this.apiService.getUserNameById(customer_id).subscribe(
                data => {
                  iterator['customer_name'] = data['username']
                }
              )
            }
          }
        )
      }
    )
  }
}
