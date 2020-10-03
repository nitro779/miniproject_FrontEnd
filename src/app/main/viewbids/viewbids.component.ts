import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BiddingService } from 'src/app/services/bidding.service';

@Component({
  selector: 'app-viewbids',
  templateUrl: './viewbids.component.html',
  styleUrls: ['./viewbids.component.css']
})
export class ViewbidsComponent implements OnInit {

  bids
  isEmpty = false
  constructor(private bidsService:BiddingService,private router:Router) { }

  ngOnInit(): void {
    this.bidsService.viewMyBids(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        this.bids = data
        if(this.bids.length == 0){
          this.isEmpty = true
        }
      }
    )
  }

  purchaseProduct(bid){
    this.router.navigate(['/app/payment/bid/',bid.biddingid])
  }
}
