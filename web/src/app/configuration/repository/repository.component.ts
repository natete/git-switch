import {Component, OnInit, Input, style, animate, sequence, transition, trigger} from '@angular/core';
import {Repository} from "./repository";

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ height: '0', opacity: '0', transform: 'translateY(-100px)' }),
        sequence([
          animate(".7s ease", style({ height: '*', opacity: '1', transform: 'translateY(0)' }))
        ])
      ]),
      transition(':leave', [
        style({ height: '*', opacity: '1', transform: 'translateX(0)'}),
        sequence([
          animate(".7s ease", style({ height: '0', opacity: 0, transform: 'translateY(-100px)' }))
        ])
      ])
    ])
  ]
})
export class RepositoryComponent implements OnInit {

  @Input() repository: Repository;
  unfolded: boolean = undefined;

  constructor() {
  }

  ngOnInit() {

  }

  toggleSubsection() {
    (this.unfolded && this.unfolded !== undefined) ? this.unfolded = false : this.unfolded = true;
  }
}
