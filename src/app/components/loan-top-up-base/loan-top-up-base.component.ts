import { Component, OnInit } from '@angular/core';
import { LoanTopUpPage } from 'src/app/loan-top-up/loan-top-up.page';

@Component({
  selector: 'app-loan-top-up-base',
  templateUrl: './loan-top-up-base.component.html',
  styleUrls: ['./loan-top-up-base.component.scss'],
})
export class LoanTopUpBaseComponent implements OnInit {
  rootPage = LoanTopUpPage
  constructor() { }

  ngOnInit() {}

}
