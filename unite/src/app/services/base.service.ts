import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export abstract class BaseService<T> {

  URL: string = 'http://localhost:8080/unite/';

  constructor(protected http: HttpClient) {
  }

  protected abstract specifiedUrl(): string;

  save(model: T, headers?: HttpHeaders | any): Observable<Object> {
    let observable = this.http.post(this.specifiedUrl() + '/save', model, {headers: headers});
    return observable;
  }

  get(id: number, headers?: HttpHeaders): Observable<T> {
    return <Observable<T>>this.http.get(`${this.specifiedUrl()}/get/${id}`, {headers: headers});
  }

  delete(id: number, headers?: HttpHeaders): Observable<T> {
    return <Observable<T>>this.http.delete(`${this.specifiedUrl()}/delete/ ${id}`, {headers: headers});
  }

}
