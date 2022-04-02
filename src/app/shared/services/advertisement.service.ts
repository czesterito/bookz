import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {errorFunction} from '../models/app-error';
import {environment} from '../../../environments/environment';

const baseUrl = environment.springUrl + '/advertisement';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(private http: HttpClient) { }

  createNewAdvertisement(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/`, data)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  getAdvertisement(advertisementId: any): Observable<any> {
    return this.http.get(`${baseUrl}/${advertisementId}`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  getAllAdvertisements(): Observable<any> {
    return this.http.get(`${baseUrl}/`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  getUserAdvertisements(id: any): Observable<any>  {
    return this.http.get(`${baseUrl}/user/${id}`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  deleteAdvertisement(id: any): Observable<any>  {
    return this.http.delete(`${baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  changeDescription(advertisementId: any, newDescription: any): Observable<any> {
    const params = new HttpParams()
      .set('newDescription', newDescription);

    return this.http.put(`${baseUrl}/${advertisementId}/changeDescription`, undefined, {params})
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  searchForAdvertisement(text: any, id: any, category: any = '', city: any = '', pageNr: any): Observable<any> {
    text = text.toLowerCase();
    category = category.toLowerCase();
    city = city.toLowerCase();
    const params = new HttpParams()
      .set('text', text)
      .set('id', id)
      .set('category', category)
      .set('city', city)
      .set('pageNr', pageNr);
    return this.http.get(`${baseUrl}/findBy`, {params})
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }
}
