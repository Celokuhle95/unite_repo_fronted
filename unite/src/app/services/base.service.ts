import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export abstract class BaseService<T> {

  URL: string = 'http://localhost:8080/unite/';

  constructor(protected http: HttpClient) {
  }

  protected abstract specifiedUrl(): string;

  save(model: T, headers?: HttpHeaders | any): Observable<T> {
    let observable = this.http.post(this.specifiedUrl() + '/save', model, {headers: headers});
    return <Observable<T>>observable;
  }

  get(id: number, headers?: HttpHeaders): Observable<T> {
    return <Observable<T>>this.http.get(`${URL}/get/${id}`, {headers: headers});
  }

  delete(id: number, headers?: HttpHeaders): Observable<T> {
    return <Observable<T>>this.http.delete(`${URL}/delete/ ${id}`, {headers: headers});
  }

}
