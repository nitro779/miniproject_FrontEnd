import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router:Router,private builder:FormBuilder,private biddingService:BiddingService) { }

  ngOnInit(): void {
    this.bidForm = this.builder.group({
      product :[''],
      biddername: [''],
      bidval: ['',[Validators.required]]
    }
    )
    this.productId = this.route.snapshot.paramMap.get('id')
    if(this.productId != null){
      this.product = this.productsService.getProductById(this.productId).subscribe(
        data => {
          if(data == null){
            this.router.navigate(['/app/products'])
          }
          this.product = data
        }
      )
    }
  }

  isInvalidBid(){
     return this.product.intialbid > this.bidForm.get('bidval').value
  }
  
  bidForProduct(){
    this.bidForm.patchValue({'product':this.product})
    this.bidForm.patchValue({'biddername':sessionStorage.getItem('authenticatedUser')})
    const bidsModel:BiddingModel = this.bidForm.value
    console.log(bidsModel)
    this.biddingService.bidProduct(bidsModel).subscribe(
      data =>{
        console.log(data)
        this.router.navigate(['app/mybids'])
      }
    )
  }

}
