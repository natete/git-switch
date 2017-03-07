export class PullRequest {
  description: string;
  userName: string;
  date: string;
  commits: number;
  comments: number;
  count: number;
  from: string;
  to: string;

  constructor(pullRequest?: any) {
    // TODO: Adapt this to the information received from the BE
    if (pullRequest) {
      this.count = pullRequest.count;
      this.description = pullRequest.description;
      this.userName = pullRequest.userName;
      this.date = pullRequest.date;
      this.commits = pullRequest.commits;
      this.comments = pullRequest.comments;
      this.from = pullRequest.from;
      this.to = pullRequest.to;
    }
  }
}