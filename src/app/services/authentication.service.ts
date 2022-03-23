import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { addToStorage, clearStorage, getFromStorage, removeFromStorage, TOKEN_KEY, USER_KEY } from './storage';
import {
  NativeBiometric,
} from 'capacitor-native-biometric';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userObject = new BehaviorSubject(null);
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor(private http: HttpClient) {
    getFromStorage(USER_KEY).then(value => this.userObject.next(value))
    this.checkIfAuthenticated();
  }

  logUserIn(user: any) {
    return this.http.post<any>(`${environment.baseUrl}customer/login`, user).pipe(tap(res => this.setSession(res)))
  }

  resetAccountPassword(params: any) {
    return this.http.post<any>(`${environment.baseUrl}customer/password/reset`, params)
  }

  clearStorage() {
    return NativeBiometric.deleteCredentials({server: 'accounts.creditwallet.ng'}).then(() => clearStorage(), () => () => clearStorage())
  }

  async checkIfAuthenticated() {
    const token = await getFromStorage(TOKEN_KEY);    
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  async logUserOut() {
    await removeFromStorage(TOKEN_KEY)
    this.isAuthenticated.next(false)
  }

  private setSession(authResult: any) {
    addToStorage(TOKEN_KEY, authResult.token);
    removeFromStorage(USER_KEY).then(() => addToStorage(USER_KEY, authResult.borrower), () => addToStorage(USER_KEY, authResult.borrower));
    this.isAuthenticated.next(true);
    this.userObject.next(authResult.borrower);
  }

  async getUserObject() {
    const user = await getFromStorage(USER_KEY);
    return user
  }

  async getToken() {
    const token = await getFromStorage(TOKEN_KEY)
    return token;
  }

  // public isLoggedIn() {
  //   return moment().isBefore(this.getExpiration());
  // }

 
}


