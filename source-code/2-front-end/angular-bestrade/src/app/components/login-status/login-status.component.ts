import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    // Subscribe to authentication state changes
    this.oktaAuth.authStateManager.subscribe(
      isAuth => this.isAuthenticated = isAuth
    );
   }

    async ngOnInit() {
      this.isAuthenticated = await this.oktaAuth.isAuthenticated();
      
      if (this.isAuthenticated) {
      // Fetch the logged in user details (user's claims)
      // And then, user's full name is exposed as a property name
        const userClaim = await this.oktaAuth.getUser();
        this.userFullName = userClaim.name || "";
      }
      console.log("Autentication = " + this.isAuthenticated);
      console.log("Username = " + this.userFullName);
    }
  
    async logout() {
      // Terminates the session with Okta and removes current tokens.
      await this.oktaAuth.signOut();
    }

}
