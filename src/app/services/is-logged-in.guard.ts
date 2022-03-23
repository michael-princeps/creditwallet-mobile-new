import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router){}
  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(filter(val => val !== null),
    take(1),
    map(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/main/dashboard'], { replaceUrl: true });
      } else {
        return true
      }
    }))
  }
}
