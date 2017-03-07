import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PullRequestsListComponent } from './pull-requests-list/pull-requests-list.component';
import { PullRequestComponent } from './pull-request/pull-request.component';
import { PullRequestsService } from './pull-requests.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PullRequestsListComponent
  ],
  declarations: [PullRequestsListComponent, PullRequestComponent],
  providers: [PullRequestsService]
})
export class PullRequestsModule { }
