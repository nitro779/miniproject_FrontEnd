import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../product';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.css']
})
export class ProductslistComponent implements OnInit {

  products:Product[]
  isEmpty
  currentUser = sessionStorage.getItem('authenticatedUser');

  constructor(private http:HttpClient,private productService:ProductsService,private router:Router) {
   }

  ngOnInit(): void {
    this.productService.getProducts(this.currentUser).subscribe(
      data =>{
        this.products = data
        console.log(this.products)
        this.isEmpty = this.products.length === 0
      }
    )
  }

  bidProduct(product){
    this.router.navigate(['app/bid',product.product_id])
  }
  
}
