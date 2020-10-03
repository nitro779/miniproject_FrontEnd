import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-purchased-details',
  templateUrl: './purchased-details.component.html',
  styleUrls: ['./purchased-details.component.css']
})
export class PurchasedDetailsComponent implements OnInit {

  orders:any
  constructor(private http:HttpClient,private ordersService:OrdersService) { }

  ngOnInit(): void {
    this.ordersService.getPurchasedOrders(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        this.orders = data
      }
    )
  }

  getTotal(){
    let sum = 0
    for (let i = 0; i < this.orders.length; i++) {
      const element = this.orders[i];
      sum += element.price
    }
    return sum
    console.log(sum)
  }

}
