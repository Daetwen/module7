import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  TOKEN_NAME: string = "token";

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem(this.TOKEN_NAME) != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem(this.TOKEN_NAME)}`
        }
      });
      console.log("intercept");
      console.log(localStorage.getItem(this.TOKEN_NAME));
    }
    return next.handle(request);
  }
}
