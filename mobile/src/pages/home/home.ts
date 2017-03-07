import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pullRequests = [
    {
      description: 'Pull Request description gfjdngfkjdnbjdkjnfvjdn',
      userName: 'UserName1',
      date: "10 months",
      commits: 312,
      comments: 129,
      count: 582,
      from: 'MB-1685-DEV_Fix',
      to: 'Master_branch_of_project'
    },
    {
      description: 'Pull Request description',
      userName: 'UserName1',
      date: "10 months",
      commits: 312,
      comments: 129,
      count: 582,
      from: 'MB-1685-DEV_Fix',
      to: 'Master_branch_of_project'
    },
    {
      description: 'Pull Request description',
      userName: 'UserName1',
      date: "10 months",
      commits: 312,
      comments: 129,
      count: 582,
      from: 'MB-1685-DEV_Fix',
      to: 'Master_branch_of_project'
    },
    {
      description: 'Pull Request description',
      userName: 'UserName1',
      date: "10 months",
      commits: 312,
      comments: 129,
      count: 582,
      from: 'MB-1685-DEV_Fix',
      to: 'Master_branch_of_project'
    },
    {
      description: 'Pull Request descriptionbhfvkdbfvkdbfvkbdfkbgbvdfgbfgbfgbbgfkdjnbdkfbnkbnfggggggggggggggggg',
      userName: 'UserName1gbfgbfgbfgbfgbf',
      date: "10 monthsgfbfgbfgbfgb",
      commits: 312,
      comments: 129,
      count: 582,
      from: 'MB-1685-DEV_Fixfgbfsgbbbgggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
      to: 'Master_branch_of_projectggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg'
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
