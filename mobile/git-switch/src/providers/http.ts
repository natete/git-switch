import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
 Generated class for the Http provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Http {

  constructor(public http: Http) {
    console.log('Hello Http Provider');
  }

}
