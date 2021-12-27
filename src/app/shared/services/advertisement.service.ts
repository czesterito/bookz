import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
}
