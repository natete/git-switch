import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Account } from '../../pages/accounts/account';

export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} {
    const accounts: Account[] = [
      {
        id: 1,
        type: 'github',
        name: 'natete',
        avatar: 'https://avatars2.githubusercontent.com/u/4098303?v=3&s=40',
        numOfRepos: 21
      },
      {
        id: 2,
        type: 'github',
        name: 'manju',
        avatar: 'https://avatars1.githubusercontent.com/u/11319302?v=3&s=40',
        numOfRepos: 2
      }
    ];

    return {
      accounts: accounts,
      pullRequests: [],
      user: {}
    };
  }

}
