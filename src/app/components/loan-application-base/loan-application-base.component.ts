import { Component, Input, OnInit } from '@angular/core';
import { LoanApplicationPage } from 'src/app/loan-application/loan-application.page';
import { LoanAutoDisburseApplicationPage } from 'src/app/loan-auto-disburse-application/loan-auto-disburse-application.page';

@Component({
  selector: 'app-loan-application-base',
  templateUrl: './loan-application-base.component.html',
  styleUrls: ['./loan-application-base.component.scss'],
})
export class LoanApplicationBaseComponent implements OnInit {
  rootPage;
  constructor() { }

  ngOnInit() {
    console.log('loan base')
  }

}
