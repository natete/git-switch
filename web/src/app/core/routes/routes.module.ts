import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from '../../login/login.component';
import { HomeComponent } from '../../home/home.component';

const routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuardService ] },
  { path: 'login', component: LoginComponent, canActivate: [ AuthGuardService ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [AuthGuardService]
})
export class RoutesModule { }
