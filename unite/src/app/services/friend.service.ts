import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base.service';
import {Friend} from '../models/friend.model';
import {Observable} from 'rxjs';
import LocalStorageUtil from '../util/StorageUtil';

@Injectable()
export class FriendService extends BaseService<Friend> {

  constructor(public http: HttpClient) {
    super(http);
  }

  specifiedUrl(): string {
    return this.URL + 'friend';
  }

  getFriendIdByCellphone(cellphone: string, headers?: HttpHeaders): Observable<number> {
    return <Observable<number>>this.http.get(`${this.specifiedUrl()}/friendId/${cellphone}`, {headers: headers});
  }

  getFriendsByCurrentUserId(headers?: HttpHeaders): Observable<Friend[]> {
    const currentUserId = LocalStorageUtil.getCurrentUserId();
    console.log("Current User: ID", currentUserId);
    return <Observable<Friend[]>>this.http.get(`${this.specifiedUrl()}/myfriends/${currentUserId}`, {headers: headers});
  }

}
