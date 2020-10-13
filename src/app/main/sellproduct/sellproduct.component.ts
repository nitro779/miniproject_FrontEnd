import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-sellproduct',
  templateUrl: './sellproduct.component.html',
  styleUrls: ['./sellproduct.component.css']
})
export class SellproductComponent implements OnInit {

  auctProduct:any
  imageFile : File
  imageUrl
  fileName
  userId
  sellerForm:FormGroup;
  constructor(private builder:FormBuilder,private apiService:ApiService,
    private router:Router) {
   }

   ngOnInit(): void {
    this.sellerForm = this.builder.group({
        productname : ['',[Validators.required]],
        description: ['',[Validators.required]],
        category : ['', [Validators.required]],
        initialbid : ['',[Validators.required]],
        seller_id :[''],
        file : ['',[Validators.required]],
        image: new FormControl()
      }
    )
    this.apiService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data =>{
        this.sellerForm.patchValue({seller_id:data})
      }
    )
  }

  auctionProduct(){
    this.sellerForm.patchValue({image:this.imageUrl})
    this.auctProduct = this.sellerForm.value
    console.log(this.auctProduct)
    this.apiService.addProduct(this.auctProduct).subscribe(
      data =>{
        if(data!=0){
          console.log("Product Added successfully")
          this.router.navigate(['app/myauctions'])
        }else{
          console.log("Error While Adding the Product")
        }
      }
    )
  }

  onSelectedFile(event){
    this.imageFile = event.target.files[0]
    var reader = new FileReader();
    reader.readAsDataURL(this.imageFile);
    reader.onload = (event:any) => {
      console.log(event.target.result)
      this.imageUrl = event.target.result;
    }
    }
}
