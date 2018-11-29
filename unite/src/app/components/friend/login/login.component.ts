import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  growlMessages: Message[] = [];

  constructor(private myapp: AppComponent) { }

  ngOnInit() {
  }

  login() {
    console.log('current state:', this.myapp.isLoggedIn);
    this.myapp.isLoggedIn = true;
    console.log('current state after:', this.myapp.isLoggedIn);
  }

}
