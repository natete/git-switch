export class PullRequest {
  title: string;
  description: string;
  username: string;
  date: string;
  commits: number;
  comments: number;
  id: number;
  from: string;
  to: string;

  constructor(pullRequest?: any) {
    if (pullRequest) {
      this.title = pullRequest.title;
      this.id = pullRequest.id;
      this.description = pullRequest.description;
      this.username = pullRequest.username;
      this.date = pullRequest.date;
      this.commits = pullRequest.commits;
      this.comments = pullRequest.comments;
      this.from = pullRequest.from;
      this.to = pullRequest.to;
    }
  }
}