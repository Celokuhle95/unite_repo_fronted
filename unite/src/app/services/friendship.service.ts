import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Friendship} from '../models/friendship.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Friend} from '../models/friend.model';
import LocalStorageUtil from '../util/StorageUtil';

@Injectable()
export class FriendshipService extends BaseService<Friendship> {

  constructor(http: HttpClient) {
    super(http);
  }

  specifiedUrl(): string {
    return this.URL + 'friendship';
  }

  getFriendshipIdByParticipatorsIds(otherFriendId: number, headers?: HttpHeaders): Observable<number> {
    return <Observable<number>>this.http.get(`${this.specifiedUrl()}/getByParticipators/${LocalStorageUtil.getCurrentUserId()}/${otherFriendId}`, {headers: headers});
  }

}
