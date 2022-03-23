import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = async () => await this.authService.getToken();
    return from(userToken()).pipe(take(1), switchMap((token) => {
      let headers = req.headers;
      if (req.url.includes('borrower') || req.url.includes('loan')) {
        headers = headers.delete('content-type');
      } else {
        headers = headers.set('Content-Type', 'application/json');
      }
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);

        const cloneReq = req.clone({ headers });
        return next.handle(cloneReq);
      } else {
        return next.handle(req);
      }
    }))
  }
}