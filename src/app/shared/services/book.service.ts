import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {errorFunction} from '../models/app-error';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Book} from '../models/book';

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

  updateBook(book: Book): Observable<any> {
    return this.http.put(`${baseUrl}/${book.bookId}`, book)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  searchForBooks(text: any, id: any): Observable<any> {
    text = text.toLowerCase();
    const params = new HttpParams()
      .set('text', text)
      .set('id', id);
    return this.http.get(`${baseUrl}/findBy`, {params})
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }
}
