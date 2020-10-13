import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { ProductslistComponent } from './productslist/productslist.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  name
  constructor(private authenticator:AuthenticationService,private router:Router,private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        this.apiService.getUserNameById(data).subscribe(
          data => {
            this.name = data['fullname'].toString().split(" ")[1]
          }
        )
      }
    )
  }

  logout(){
    this.authenticator.logout()
  }
}
