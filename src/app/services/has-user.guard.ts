import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { getFromStorage, USER_KEY } from './storage';

@Injectable({
  providedIn: 'root'
})
export class HasUserGuard implements CanLoad {
  constructor(private router: Router) {}
  async canLoad(): Promise<boolean> {
    const user = await getFromStorage(USER_KEY)
    if (user) {
      this.router.navigateByUrl('/unauthenticated', { replaceUrl:true });
      return false;
    } else {
      return true
    }
  }
}
