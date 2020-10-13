import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BiddingService } from 'src/app/services/bidding.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-myauctions',
  templateUrl: './myauctions.component.html',
  styleUrls: ['./myauctions.component.css']
})
export class MyauctionsComponent implements OnInit {

  myProducts:any
  empty
  isAccepted = false;
  constructor(private productService:ProductsService,private bidsService:BiddingService,private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getUserProducts(sessionStorage.getItem('authenticatedUser')).subscribe(
      data =>{
        this.myProducts = data
        for (let index = 0; index < this.myProducts.length; index++) {
          const element = this.myProducts[index];
          this.apiService.getBidsReceivedForProduct(element.pid).subscribe(
            data => {
              element.bids = data
              for (let i = 0; i < element.bids.length; i++) {
                const bid = element.bids[i];
                console.log(bid)
                this.apiService.getUserNameById(bid['customer_id']).subscribe(
                  data => {
                    console.log(data)
                    bid['biddername'] = data['username']
                  }
                )
              }
            }
          )
        }
        this.empty = this.myProducts.length === 0;
      }
    );
  }

  deleteProduct(product){
    this.productService.deleteProduct(product.product_id).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

  acceptBid(bid){
    this.apiService.acceptBid(bid).subscribe(
      data => {
        this.isAccepted = true
      }
    )
  }

  closeAlert(){
    this.isAccepted = false
    this.ngOnInit()
  }
}
