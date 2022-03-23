import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { MainService } from '../services/main.service';

@Injectable({
  providedIn: 'root'
})
export class ViewLoanResolverService implements Resolve<any> {

  constructor(private service: MainService, private loader: LoaderService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let id = route.paramMap.get('id');
      this.loader.simpleLoader();
      return this.service.getSingleLoanDetails(id).pipe(tap(() => this.loader.dismissLoader()))
  }
}
