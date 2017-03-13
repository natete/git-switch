import {Component, OnInit} from '@angular/core';
import {HostListener} from "@angular/core";

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss']
})
export class BackToTopComponent implements OnInit {

  isVisible = false;
  jumpInterval: number = 5; //ms to wait for next jump. If too high, the effect won't be pretty.
  jumpSize: number = 0.15;  //This means 15% of the total height will be use for small scroll steps.
                            //Increase/decrease % for setting speed.

  ngOnInit() {
    this.toggleVisibility();
  }

  constructor() {
  }


  @HostListener('window:scroll', ['$event'])
  toggleVisibility(): void {
    window.pageYOffset > 0 ? this.isVisible = true : this.isVisible = false;
  }

  goToTop(): void {
    let dis: number = window.pageYOffset; //Get the current window height
    let interval = setInterval(() => {
      document.body.scrollTop = dis;

      //dis=dis-window.pageYOffset*jumSize;             //Linear effect
      dis = dis - dis * this.jumpSize;                  //Accelerate, then decelerate

      //Check if scroll is already near top (dis never reaches 0) and finish scrolling
      if (dis <= 1) {
        clearInterval(interval);
        window.scrollTo(0,0);
      }
    }, this.jumpInterval);
  }
}
