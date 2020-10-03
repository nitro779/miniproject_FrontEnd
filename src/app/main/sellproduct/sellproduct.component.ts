import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuctionproductService } from 'src/app/services/auctionproduct.service';
import { Product } from '../product';
@Component({
  selector: 'app-sellproduct',
  templateUrl: './sellproduct.component.html',
  styleUrls: ['./sellproduct.component.css']
})
export class SellproductComponent implements OnInit {

  auctProduct:Product
  imageFile : File
  fileName
  sellerForm:FormGroup;
  constructor(private builder:FormBuilder,private productService:AuctionproductService,
    private router:Router) {
    this.sellerForm = builder.group(
      {
        productname : ['',[Validators.required]],
        description: ['',[Validators.required]],
        category : ['', [Validators.required]],
        initialbid : ['',[Validators.required]],
        sellerid : ['',],
        imageurl : ['',[Validators.required]]
      }
    )
   }

   ngOnInit(): void {
    this.sellerForm.patchValue({sellerid:sessionStorage.getItem('authenticatedUser')})
  }

  auctionProduct(){
    this.auctProduct = this.sellerForm.value
    console.log(this.auctProduct)
    this.productService.auctionProduct(this.auctProduct).subscribe(
      data => {
        console.log("Product Added Successfully")
        this.router.navigate(['/app/myauctions'])
      },
      error => {
        console.log(error)
      }
    )
  }
}
