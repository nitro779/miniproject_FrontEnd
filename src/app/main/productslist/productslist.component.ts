import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Categories } from '../Categories';
import { Product } from '../product';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.css']
})
export class ProductslistComponent implements OnInit {
  products:Product[]
  categories = new Categories().categoriesList
  isEmpty
  showOverlay = true;
  alert = true
  currentUser = sessionStorage.getItem('authenticatedUser');

  constructor(private http:HttpClient,private apiService:ApiService,private router:Router) {
   }

  ngOnInit(): void {
    this.showOverlay = true
    this.apiService.getProducts(this.currentUser).subscribe(
      data =>{
        this.products = data
        this.isEmpty = this.products.length === 0
        for (let element of this.products){
          this.apiService.getUserNameById(element['seller_id']).subscribe(
            data => {
              element['sellername'] = data['username']
            }
          )
        }
      }
    )
    this.showOverlay = false
  }

  bidProduct(product){
    this.router.navigate(['app/bid',product.pid])
  }

  closeAlert(){
    this.alert = false
  }
}
