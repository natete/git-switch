export class Account {
  id: number;
  name: string;
  email: string;
  type: string;
  photoUrl: string;
  repoNumber: number;

  constructor(account?: any) {
    // TODO: Adapt this to the information received from the BE
    if (account) {
      this.id = account.id;
      this.name = account.name;
      this.email = account.email;
      this.photoUrl = account.photoUrl;
      this.repoNumber = account.repoNumber;
      this.type = account.type || 'git';
    }
  }
}