import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenHeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('token')) {
      const token = JSON.parse(sessionStorage.getItem('token') as string);
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token.access_token}`),
      });
      return next.handle(modifiedReq);
    } else {
      return next.handle(req);
    }
  }
}

