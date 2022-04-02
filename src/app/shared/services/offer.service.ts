import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {errorFunction} from '../models/app-error';
import {environment} from '../../../environments/environment';
import {User} from '../models/user';
import {Offer} from '../models/offer';

const baseUrl = environment.springUrl + '/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  createNewOffer(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/`, data)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  getOffer(offerId: any): Observable<any> {
    return this.http.get(`${baseUrl}/${offerId}`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  getAllOffers(): Observable<any> {
    return this.http.get(`${baseUrl}/`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  deleteOffer(id: any): Observable<any>  {
    return this.http.delete(`${baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  getUserOffers(id: any): Observable<any>  {
    return this.http.get(`${baseUrl}/user/${id}`)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

  updateOffer(offer: Offer): Observable<any> {
    return this.http.put(`${baseUrl}/${offer.offerId}`, offer)
      .pipe(
        catchError(error => {
          return errorFunction(error);
        })
      );
  }

}
