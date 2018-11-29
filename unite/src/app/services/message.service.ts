import {Component, Injectable, OnInit,} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base.service';
import {Message} from '../models/message.model';
import {Observable} from 'rxjs';
import LocalStorageUtil from '../util/StorageUtil';

@Injectable()
export class MessageService extends BaseService<Message> {

  constructor(http: HttpClient) {
    super(http);
  }

  specifiedUrl(): string {
    return this.URL + 'message';
  }

  loadLatest(headers?: HttpHeaders): Observable<Message[]> {
    return <Observable<Message[]>>this.http.get(`${URL}/load/${LocalStorageUtil.getFriendshipId()}`, {headers: headers});
  }

}
