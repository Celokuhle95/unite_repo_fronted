import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/api';
import {AppComponent} from '../../../app.component';
import LocalStorageUtil from '../../../util/StorageUtil';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  growlMessages: Message[] = [];

  username: string;

  password: string;

  constructor(private myapp: AppComponent, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    if(this.isDataValid()) {
      LocalStorageUtil.setCurrentUserId(parseInt(this.username)); // edit for real login
      this.myapp.isLoggedIn = true;
      this.router.navigateByUrl('/friends');
    } else {
      this.growlMessages.push({summary: 'Please ensure that all details are provided', severity: 'warn'});
    }
  }

  private isDataValid(): boolean {
    return this.username !== undefined;
  }

}
