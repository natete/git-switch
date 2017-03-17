export class Repository {
  id: number;
  name: string;
  issues: number;
  type: string;
  age: string;
  username: string;

  constructor(repository?: any) {
    // TODO: Adapt this to the information received from the BE
    if (repository) {
      this.id = repository.id;
      this.name = repository.username;
      this.issues = repository.fullname;
      this.type = repository.email;
      this.age = repository.age;
      this.username = repository.username;
    }
  }
}
