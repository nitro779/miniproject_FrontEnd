import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  regUser;
  isRegisterSuccessful = true;

  constructor(private formBuilder: FormBuilder,private registrationService:RegistrationService,private router:Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  registerUser(){
    this.regUser = this.registerForm.value
    this.registrationService.registerUser(this.regUser).subscribe(
      data =>{
        this.router.navigate(['home/login'])
        console.log(data);
        this.isRegisterSuccessful = true
      },
      error => {
        console.log(error.error.message)
        this.isRegisterSuccessful = false
      }
    )
  }
}
