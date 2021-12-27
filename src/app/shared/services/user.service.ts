import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {errorFunction} from '../models/app-error';
import {User} from '../models/user';
import {environment} from '../../../environments/environment';

const baseUrl = environment.springUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  get loggedUser(): User {
    return JSON.parse(sessionStorage.getItem('loggedUser') as string);
  }
  set loggedUser(user: User) {
    sessionStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getUser(userId: any): Observable<any> {
    return this.http.get(`${baseUrl}/${userId}`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  searchForUsers(user: any, id: any): Observable<any> {
    user = user.toLowerCase();
    const params = new HttpParams()
      .set('name', user)
      .set('id', id);
    return this.http.get(`${baseUrl}/findBy`, {params})
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  getUserByEmail(email: any): Observable<any> {
    const params = new HttpParams()
      .set('email', email.toLowerCase());
    return this.http.get(baseUrl + '/email', {params});
  }

  getUserByName(username: any): Observable<any> {
    const params = new HttpParams()
      .set('username', username.toLowerCase());
    return this.http.get(baseUrl + '/username', {params})
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  checkIfEmailIsTaken(email: any): Observable<any> {
    const params = new HttpParams()
      .set('email', email.toLowerCase());
    return this.http.get(baseUrl + '/emailTaken', {params, responseType: 'text'}, )
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  checkIfNameIsTaken(username: any): Observable<any> {
    const params = new HttpParams()
      .set('username', username.toLowerCase());
    return this.http.get(baseUrl + '/nameTaken', {params, responseType: 'text'}, )
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  createNewUser(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/`, data)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }
}
