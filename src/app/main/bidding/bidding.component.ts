import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { BiddingService } from 'src/app/services/bidding.service';
import { ProductsService } from 'src/app/services/products.service';
import { BiddingModel } from '../biddingmodel';
@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {

  bidForm: FormGroup
  product
  productId
  constructor(private route:ActivatedRoute,private http:HttpClient,private productsService:ProductsService,
    private router:Router,private builder:FormBuilder,private apiService:ApiService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')
    this.bidForm = this.builder.group({
      product_id :[this.productId],
      customer_id: [''],
      bidval: ['',[Validators.required]],
      status:[0]
    }
    )
    if(this.productId != null){
      this.product = this.apiService.getProductByProductId(this.productId).subscribe(
        data => {
          if(data == null){
            this.router.navigate(['/app/products'])
          }
          this.product = data
          this.apiService.getUserNameById(this.product.pid).subscribe(
            data => {
              this.product['sellername'] = data['username']
            }
          )
        }
      )
    }
    this.apiService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        let id = data
        this.bidForm.patchValue({customer_id:id})
      }
    )
  }

  isInvalidBid(){
     return this.product.initialbid > this.bidForm.get('bidval').value
  }
  
  bidForProduct(){
    const bidDetails = this.bidForm.value
    this.apiService.addBidForProduct(bidDetails).subscribe(
      data => {
        this.router.navigate(['app/mybids'])
      }
    )
  }

}
