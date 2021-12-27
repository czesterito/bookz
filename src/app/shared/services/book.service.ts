import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {errorFunction} from '../models/app-error';
import {HttpClient, HttpParams} from '@angular/common/http';

const baseUrl = environment.springUrl + '/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  createNewBook(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/`, data)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  getBook(bookId: any): Observable<any> {
    return this.http.get(`${baseUrl}/${bookId}`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  getAllBooks(): Observable<any> {
    return this.http.get(`${baseUrl}/`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }
}
