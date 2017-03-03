import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { RoutesModule } from './core/routes/routes.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './core/auth/auth.service';
import { httpFactory } from './core/http/http.factory';

import 'hammerjs';
import { AccountsModule } from './accounts/accounts.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    AccountsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutesModule,
    SharedModule
  ],
  providers: [
      AuthService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, AuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
