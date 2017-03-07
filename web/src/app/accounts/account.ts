export class Account {
  id: number;
  fullname: string;
  username: string;
  email: string;
  type: string;
  photoUrl: string;
  repoNumber: number;
  organization: string;
  location: string;

  constructor(account?: any) {
    // TODO: Adapt this to the information received from the BE
    if (account) {
      this.id = account.id;
      this.username = account.username;
      this.fullname = account.fullname;
      this.email = account.email;
      this.photoUrl = account.photoUrl;
      this.repoNumber = account.repoNumber;
      this.type = account.type || 'git';
      this.organization = account.organization;
      this.location = account.location;
    }
  }
}