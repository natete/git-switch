import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SpinnerService {

  private spinnerStatus = new BehaviorSubject<boolean>(false);

  constructor() { }

  /**
   * Get the observable for the spinner status.
   * @returns {Observable<boolean>}.
   */
  getSpinnerStatus(): Observable<boolean> {
    return this.spinnerStatus.asObservable();
  }

  /**
   * Show the spinner.
   */
  showSpinner(): void {
    this.spinnerStatus.next(true);
  }

  hideSpinner(): void {
    this.spinnerStatus.next(false);
  }

}
