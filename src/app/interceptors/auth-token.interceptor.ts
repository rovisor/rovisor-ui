import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if(!token){
      return next.handle(request);
    }
    const modifiedRequest = request.clone({
      setHeaders:{ Authorization: `Bearer ${token}`}
    })
    return next.handle(modifiedRequest);
  }
}