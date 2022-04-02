import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {errorFunction} from '../models/app-error';
import {environment} from '../../../environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.keycloakUrl;
  private clientId = 'spring';
  private clientSecret = '8f41ae08-bf12-49fd-861c-9315eb99579b';

  private authSubject = new BehaviorSubject<any>(null);

  private headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('token') !== null) {
      this.authSubject.next(JSON.parse( sessionStorage.getItem('token') as string));
    }
  }

  getDecodedAccessToken(): any {
    try{
      return jwt_decode(sessionStorage.getItem('token') as string);
    }
    catch (Error){
      return null;
    }
  }

  get tokenValue(): any {
    return this.authSubject.getValue();
  }

  get tokenAsObservable(): Observable<any> {
    return this.authSubject.asObservable();
  }

  nextToken(token: any): any {
    this.authSubject.next(token);
  }

  login(username: any, password: any): Observable<any> {
    const body = `grant_type=password&client_id=${this.clientId}&client_secret=${this.clientSecret}&username=${username}&password=${password}`;
    return this.http.post(this.baseUrl + '/realms/Bookz/protocol/openid-connect/token',
      body, {headers: this.headers})
      .pipe(map(token => {
        sessionStorage.setItem('token', JSON.stringify(token));
        this.authSubject.next(token);
      }));
    }

  refreshToken(): any {
    const body = `grant_type=refresh_token&client_id=${this.clientId}&client_secret=${this.clientSecret}&refresh_token=${this.tokenValue.refresh_token}`;
    return this.http.post(this.baseUrl + '/realms/Bookz/protocol/openid-connect/token',
      body, {headers: this.headers}).pipe(
      catchError(error => {
        return errorFunction(error);
      })
    );
  }

  logout(): any {
    const body = `client_id=${this.clientId}&client_secret=${this.clientSecret}&refresh_token=${this.tokenValue.refresh_token}`;
    sessionStorage.removeItem('token');
    this.nextToken(null);
    return this.http.post(this.baseUrl + '/realms/Bookz/protocol/openid-connect/logout',
      body, {headers: this.headers}).pipe(tap( () => {}),
      catchError(error => {
      return errorFunction(error);
    }));
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }
}
