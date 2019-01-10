import {Component} from '@angular/core';
import LocalStorageUtil from './util/StorageUtil';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'unite';

  isLoggedIn: boolean;

  constructor(private router: Router) {
    LocalStorageUtil.removeCurrentUserId();
    LocalStorageUtil.removeFriendshipId();
  }

  logout() {
    this.isLoggedIn = false;
    LocalStorageUtil.removeCurrentUserId();
    this.router.navigateByUrl('/login')
  }

}
