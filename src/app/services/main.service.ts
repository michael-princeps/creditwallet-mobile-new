import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  modulePath = 'loans';

  constructor(private http: HttpClient) { }

  // dashboard 
  getDashboard() {
    return this.http.get<any>(`${environment.baseUrl}customer/account/dashboard`)
  }

  //account 
  requestAccountStatement(params, url) {
    return this.http.post<any>(`${environment.baseUrl}customer/request/${url}`, params)
  }

  changeUserPassword(params) {
    return this.http.post<any>(`${environment.baseUrl}customer/password/change`, params)
  }

  // loans
  getAllLoans() {
    return this.http.get<any>(`${environment.baseUrl}customer/loan/all`)
  }

  getSingleLoanDetails(loan_id: string) {
    return this.http.post<any>(`${environment.baseUrl}customer/loan/one`, {loan_id})
  }

  calculateLoanOffer(details: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}utilities/loan/calculator`, details)
  }

  applyForLoan(details: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}customer/apply`, details)
  }
  
  applyForLiquidation(details: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}customer/loan/liquidate`, details)
  }

  sendAccountStatement(details: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}customer/schedule/generate/send`, details)
  }

  calculateAutoDisburseLoanOffer(details: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}agent/apply`, details)
  }

  recalculateLoanOffer(details: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}customer/calculate-repayment`, details)
  }

  performLiveness(details: any): Observable<any> {
    // return this.http.post(`${environment.baseUrl}agent/liveness/detection`, details);
    const headers = new HttpHeaders({
      'Authorization': 'Basic OlAkS0wmKCNANDEy'
    })
    return this.http.post('http://ec2-13-244-90-123.af-south-1.compute.amazonaws.com/pekla/api/liveVerificationTest', details, {headers})
  }

  submitAutoDisbursePersonalDetails(details: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}agent/loan/personal/submit`, details)
  }

  submitAutoDisburseDocuments(details: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}agent/loan/passport/submit`, details)
  }

  // accept offer 
  fetchInitialOffer(id: string | undefined) : Observable<any> {
    // return this.http.post(`${environment.baseUrl}loans/automation/offer/view`, {id});
    return this.http.post(`${environment.baseUrl}${this.modulePath}/offer/view`, {id});
  }


  confirmCreditCode(details: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}loans/automation/confirm/code`, details);
  }

  uploadSelfie(details: any) : Observable<any> {
    return this.http.post(`${environment.baseUrl}loans/passport/store`, details);
  }

  acceptOffer(loan: any) : Observable<any> {
    // return this.http.post(`${environment.baseUrl}loans/automation/offer/accept`, {id});
    return this.http.post(`${environment.baseUrl}loan/finalize/new`, loan);
  }

  verifyAccountDetails(account_details: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}utilities/verify/account`, account_details)
  }

  addAccount(account_details: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}loan/account/add`, account_details)
  }

  uploadID(details: any) : Observable<any> {
    // return this.http.post(`${environment.baseUrl}loan/document/upload`, details, {reportProgress: true});
    return this.http.post(`${environment.baseUrl}loans/upload`, details, {reportProgress: true});
  }
}
