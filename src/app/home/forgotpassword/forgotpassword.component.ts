import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  alert:boolean = false
  constructor(private apiService:ApiService,private router:Router) { }

  ngOnInit(): void {
  }

  forgotPassword(value){
    console.log(value)
    this.apiService.forgotPassword(value['username']).subscribe(
      data => {
        console.log(data)
        this.alert = true
      }
    )
  }

  closeAlert(){
    this.alert = false
    this.router.navigate(['/home/login'])
  }

}
