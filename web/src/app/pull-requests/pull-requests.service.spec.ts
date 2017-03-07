import { TestBed, inject } from '@angular/core/testing';

import { PullRequestsService } from './pull-requests.service';

describe('PullRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PullRequestsService]
    });
  });

  it('should ...', inject([PullRequestsService], (service: PullRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
