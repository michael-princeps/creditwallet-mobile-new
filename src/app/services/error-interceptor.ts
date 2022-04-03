import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ToastService } from './toast.service';
import { LoaderService } from './loader.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private toastService: ToastService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let snapShot = this.activatedRoute.snapshot as any;
    const url: string = snapShot['_routerState'].url;
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      this.loaderService.dismissLoader();
      if (!url.includes('/login') || !url.includes('/unauthenticated')) {
        if (error.status === 401) {
          // this.alertService.error(error.error.message)
          this.authService.logUserOut().then(() => {
            this.router.navigate(['/login'], {replaceUrl: true})
          })
        } else if (error.status === 500) {
          // this.alertService.error('Unknown Error')
          if (!req.url.includes('customer/token-update')) {
            this.toastService.presentToast('danger', 'Please contact support')
          }
          // this.router.navigate(['/error'])
          // if (environment.production) {
          //     this.router.navigate(['/error'])
          // } else {
          //     this.alertService.error('Unknown Error')
          // }
        } else {
          if (!req.url.includes('agent/apply')) {
            this.toastService.presentToast('danger', error.error.message)
          }
        }
      }
      return throwError(error)
    }));
  }
}