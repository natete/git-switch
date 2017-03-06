import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './shared/providers/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  private mustShowSpinner;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.getSpinnerStatus()
      .subscribe((res) => {
          this.mustShowSpinner = res
      });
  }
}
