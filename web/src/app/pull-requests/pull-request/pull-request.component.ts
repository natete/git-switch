import { Component, OnInit, Input } from '@angular/core';
import { PullRequest } from '../pull-request';

@Component({
  selector: 'app-pull-request',
  templateUrl: './pull-request.component.html',
  styleUrls: ['./pull-request.component.scss']
})
export class PullRequestComponent implements OnInit {

  @Input() pullRequest: PullRequest;

  constructor() { }

  ngOnInit() {
  }

}
