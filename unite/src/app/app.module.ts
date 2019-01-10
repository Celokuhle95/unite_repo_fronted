import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RegisterComponent} from './components/friend/create/register.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule, MessagesModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {GrowlModule} from 'primeng/growl';
import {ChatComponent} from './components/chat/chat.component';
import {HttpClientModule} from '@angular/common/http';
import {FriendService} from './services/friend.service';
import {FriendshipService} from './services/friendship.service';
import {MessageService} from './services/message.service';
import {LoginComponent} from './components/friend/login/login.component';
import {ListComponent} from './components/friend/list/list.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthRouteGuardService} from './services/auth.service';

const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'friends', component: ListComponent, canActivate: [AuthRouteGuardService]},
  {path: 'message', component: ChatComponent, canActivate: [AuthRouteGuardService]},
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ChatComponent,
    LoginComponent,
    ListComponent
  ],
  imports: [
    FormsModule, BrowserModule, RouterModule, RouterModule.forRoot(routes), InputTextModule, ButtonModule, MessagesModule, GrowlModule,
    ReactiveFormsModule, HttpClientModule, TableModule, DialogModule, BrowserAnimationsModule
  ],
  providers: [FriendService, FriendshipService, MessageService, AuthRouteGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
