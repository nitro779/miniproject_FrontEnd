import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginSuccess = true;
  loginForm: FormGroup;
  constructor(private builder: FormBuilder, private route: Router,private authenticator:AuthenticationService) {
    this.loginForm = this.builder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  login(){
    this.authenticator.login(this.loginForm.value.username,this.loginForm.value.password).subscribe(
      data =>{
        this.isLoginSuccess = true
      },
      error =>{
        this.isLoginSuccess = false
      }
    );
  }
}
