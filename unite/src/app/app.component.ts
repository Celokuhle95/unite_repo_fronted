import {Component} from '@angular/core';
import LocalStorageUtil from './util/StorageUtil';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    LocalStorageUtil.removeCurrentUserId();
    LocalStorageUtil.removeFriendshipId();
  }

  title = 'unite';

  isLoggedIn: boolean;

  logout() {
    this.isLoggedIn = false;
    LocalStorageUtil.removeCurrentUserId();
  }

  login() {
    LocalStorageUtil.setCurrentUserId(1);
    this.isLoggedIn = true;
  }

}
