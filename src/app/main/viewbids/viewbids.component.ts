import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { BiddingService } from 'src/app/services/bidding.service';

@Component({
  selector: 'app-viewbids',
  templateUrl: './viewbids.component.html',
  styleUrls: ['./viewbids.component.css']
})
export class ViewbidsComponent implements OnInit {

  bids
  userId
  isEmpty = false
  constructor(private bidsService:BiddingService,private router:Router,private apiService:ApiService) { }

  ngOnInit(): void {

    this.apiService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
        data => {
          this.userId = data
          this.apiService.getBidsPlaced(this.userId).subscribe(
            data => {
              this.bids = data
              console.log(this.bids)
              this.isEmpty = this.bids.length === 0
              for (let i = 0; i < this.bids.length; i++) {
                const bid = this.bids[i];
                console.log(bid)
                this.apiService.getProductByProductId(bid['product_id']).subscribe(
                  data =>{
                    bid['product'] = data
                    this.apiService.getUserNameById(bid['product']['seller_id']).subscribe(
                      data => {
                        bid['sellername'] = data['username']
                      }
                    )
                  }
                )
              }
            }
          )
        }
    )
  }

  purchaseProduct(id){
    this.router.navigate(['/app/payment/bid/',id])
  }
}
