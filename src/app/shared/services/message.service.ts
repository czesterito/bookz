import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {errorFunction} from '../models/app-error';
import {Message} from '../models/message';
import {environment} from '../../../environments/environment';

const baseUrl = environment.springUrl + '/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  createNewMessage(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/`, data)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  getMessage(messageId: any): Observable<any> {
    return this.http.get(`${baseUrl}/${messageId}`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  getAllMessages(): Observable<any> {
    return this.http.get(`${baseUrl}/`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  deleteMessage(id: any): Observable<any>  {
    return this.http.delete(`${baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  updateMessage(message: Message): Observable<any> {
    return this.http.put(`${baseUrl}/${message.messageId}`, message)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }
}
