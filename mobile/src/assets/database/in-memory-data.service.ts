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
        numOfRepos: 21,
        company: 'Emergya'
      },
      {
        id: 2,
        type: 'github',
        name: 'manju',
        avatar: 'https://avatars1.githubusercontent.com/u/11319302?v=3&s=40',
        numOfRepos: 2,
        company: 'Emergya'
      }
    ];

    const pullRequests = [
      {
        description: 'Pull Request description gfjdngfkjdnbjdkjnfvjdn',
        userName: 'UserName1',
        date: '10 months',
        commits: 312,
        comments: 129,
        count: 582,
        from: 'MB-1685-DEV_Fix',
        to: 'Master_branch_of_project'
      },
      {
        description: 'Pull Request description',
        userName: 'UserName1',
        date: '10 months',
        commits: 312,
        comments: 129,
        count: 582,
        from: 'MB-1685-DEV_Fix',
        to: 'Master_branch_of_project'
      },
      {
        description: 'Pull Request description',
        userName: 'UserName1',
        date: '10 months',
        commits: 312,
        comments: 129,
        count: 582,
        from: 'MB-1685-DEV_Fix',
        to: 'Master_branch_of_project'
      },
      {
        description: 'Pull Request description',
        userName: 'UserName1',
        date: '10 months',
        commits: 312,
        comments: 129,
        count: 582,
        from: 'MB-1685-DEV_Fix',
        to: 'Master_branch_of_project'
      },
      {
        description: 'Pull Request descriptionbhfvkdbfvkdbfvkbdfkbgbvdfgbfgbfgbbgfkdjnbdkfbnkbnfggggggggggggggggg',
        userName: 'UserName1gbfgbfgbfgbfgbf',
        date: '10 monthsgfbfgbfgbfgb',
        commits: 312,
        comments: 129,
        count: 582,
        from: 'MB-1685-DEV_Fixfgbfsgbbbgggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
        to: 'Master_branch_of_projectggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg'
      }
    ];

    return {
      accounts: accounts,
      pullRequests: pullRequests,
      user: {}
    };
  }

}
