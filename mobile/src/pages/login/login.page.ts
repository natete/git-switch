import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth/auth.service';

/*
 Generated class for the Login page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html'
})
export class LoginPage {

  username = '';
  password = '';
  errorMessage: string;

  constructor(private authService: AuthService) {}

  /**
   * @returns {boolean} true if the user has fullfiled username and password, false otherwise.
   */
  canLogIn(): boolean {
    return this.username.trim() === '' || this.password.trim() === '';
  }

  /**
   * Logs into the application and shows an error if the user cannot log in.
   */
  login(): void {
    this.authService.login(this.username, this.password)
        .catch(() => this.errorMessage = 'Invalid username and/or password');
  }
}
