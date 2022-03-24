import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { getFromStorage, USER_KEY } from './storage';

@Injectable({
  providedIn: 'root'
})
export class HasUserLogInGuard implements CanLoad {
  constructor(private router: Router) {}
  async canLoad(): Promise<boolean> {
    const user = await getFromStorage(USER_KEY)
    if (user) {
      return true;
    } else {
      this.router.navigateByUrl('/login', { replaceUrl:true });
      return true
    }
  }
}

