import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from '../../login/login.component';
import { HomeComponent } from '../../home/home.component';
import { ConfigurationComponent } from '../../configuration/configuration.component';
import { AccountsListComponent } from '../../accounts/accounts-list/accounts-list.component';

const routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuardService ] },
  { path: 'login', component: LoginComponent, canActivate: [ AuthGuardService ] },
  { path: 'configuration', component: ConfigurationComponent, canActivate: [ AuthGuardService ] },
  { path: 'accounts', component: AccountsListComponent, canActivate: [ AuthGuardService ] }
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
