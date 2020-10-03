import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BiddingService } from 'src/app/services/bidding.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../product';

@Component({
  selector: 'app-myauctions',
  templateUrl: './myauctions.component.html',
  styleUrls: ['./myauctions.component.css']
})
export class MyauctionsComponent implements OnInit {

  myProducts:Product[]
  empty
  constructor(private productService:ProductsService,private bidsService:BiddingService) { }

  ngOnInit(): void {
    this.productService.getSellerProducts(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        this.myProducts = data
        for (const iterator of this.myProducts) {
          const bid = this.bidsService.getBidsByProductId(iterator.product_id).subscribe(
            data => {
              iterator.bids = data
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
        this.ngOnInit()
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

  acceptBid(bid){
    this.productService.acceptBid(bid).subscribe(
      data => {
        console.log("Accepted")
      }
    )
  }
}
