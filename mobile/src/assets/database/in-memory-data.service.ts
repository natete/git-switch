import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Account } from '../../pages/accounts/account';
import { PullRequest } from '../../pages/pull-requests/pull-request';
import { Setting } from '../../pages/settings/setting';
import { RepositorySetting } from '../../pages/repository-settings/repository-setting';

export class InMemoryDataService implements InMemoryDbService {
  createDb(): {} {
    const accounts: Account[] = [
      {
        id: 1,
        fullname: 'Nacho Gonzalez',
        type: 'github',
        username: 'natete',
        email: 'igonzalez@emergya.com',
        photoUrl: 'https://avatars2.githubusercontent.com/u/4098303?v=3&s=40',
        repoNumber: 21,
        organization: 'Emergya',
        location: 'Sevilla'
      },
      {
        id: 2,
        fullname: 'Mercedes Jimenez',
        type: 'github',
        username: 'manju',
        email: 'mjimenez@emergya.com',
        photoUrl: 'https://avatars1.githubusercontent.com/u/11319302?v=3&s=40',
        repoNumber: 2,
        organization: 'Emergya',
        location: 'Sevilla'
      }
    ];

    const pullRequests: PullRequest[] = [
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

    const settings: Setting[] = [
      {
        id: 1,
        name: "Forked repository name",
        fork: true,
        alert: 12,
        time: "2 years"
      },
      {
        id: 2,
        name: "Repository name",
        fork: false,
        alert: 7,
        time: "10 monthsngbkjnfgkbjnfgjbnfgbnjf"
      }
    ];

    const repositorySettings: RepositorySetting[] = [
      {
        id: 1,
        newOnesPull: true,
        commitsPull: true,
        commentsPull: false,
        newOnesIssues: false,
        commitsIssues:false
      }, {
        id: 2,
        newOnesPull: true,
        commitsPull: true,
        commentsPull: true,
        newOnesIssues: true,
        commitsIssues:true
      }
    ];


    return {
      accounts: accounts,
      pullRequests: pullRequests,
      settings: settings,
      repositorySettings: repositorySettings,
      user: {}
    };
  }

}
