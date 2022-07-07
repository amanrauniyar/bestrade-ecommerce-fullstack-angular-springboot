import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from 'src/app/registration.service';
import { User } from 'src/app/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    user = new User(); // Created a new user object
    msg = '';

  constructor(private _service : RegistrationService, private _router : Router ) { }

  ngOnInit(): void {
  }

  loginUser(){
    /* Gets the user from text-box and returns the response in form of observable. 
    To, get it we need to subscribe it.*/
  this._service.loginUserFromRemote(this.user).subscribe(
      data => {
        console.log("response received"),
        this._router.navigate(['/login-success']);
      },
      error => {
        console.log("exception occured");
        this.msg = "Bad credentials, please enter valid email address and password.";
      }
    )  
  }


}
