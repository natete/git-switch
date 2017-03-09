import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../shared/providers/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private username: string = '';
  private password: string = '';
  private errorMessage: string;

  constructor(private loginService: LoginService,
              private spinnerService: SpinnerService,
              private router: Router) { }


  /**
   * Check if the login button must be disabled.
   * @returns {boolean} true if the username and password inputs have value.
   */
  isInvalid(): boolean {
    return this.username.trim() === '' || this.password.trim() === '';
  }

  /**
   * Perform the login using the service and process the obtained response.
   */
  login(): void {

    this.spinnerService.showSpinner();

    this.loginService.login(this.username, this.password)
        .then(() => {
          this.spinnerService.hideSpinner();
          this.router.navigate(['/home']);
        })
        .catch(() => {
          this.spinnerService.hideSpinner();
          this.errorMessage = 'Invalid username or password';
        });
  }
}
