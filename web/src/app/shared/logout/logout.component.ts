import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../core/auth/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
  }

  logout(): void  {
    this.tokenService.revokeToken();
    this.router.navigate(['/login']);
  }

}
