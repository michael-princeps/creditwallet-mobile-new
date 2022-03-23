// import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-auto-disburse-breakdown-stepper',
  templateUrl: './auto-disburse-breakdown-stepper.component.html',
  styleUrls: ['./auto-disburse-breakdown-stepper.component.scss'],
})
export class AutoDisburseBreakdownStepperComponent implements OnInit, AfterViewInit {
  @Output() goNextEmitter = new EventEmitter();
  @Input() loanBreakdownData: any;
  detailsForm: FormGroup;
  newDetails: any;
  newData: any;
  constructor(private service: MainService, private loader: LoaderService, fb: FormBuilder) {
    this.detailsForm = fb.group({
      duration: [null],
      fees: [null],
      loan_amount: [null],
      monthly_repayment: [null]
    })
  }

  ngOnInit() {
    Object.keys(this.loanBreakdownData).forEach(key => {
      this.detailsForm.patchValue({ [key]: this.loanBreakdownData[key] })
    })
  }

  // public customFormatter() {
  //   // return `${value.toFixed(2)}%`
  //   return this.currencyPipe.transform(this.detailsForm.get('loan_amount').value, 'USD', 'symbol', '1.0-0')
  // }

  ngAfterViewInit(): void {
    // Object.keys(this.loanBreakdownData).forEach(key => {
    //   this.detailsForm.patchValue({ [key]: this.loanBreakdownData[key] })
    // })
  }

  goToNext() {
    this.goNextEmitter.emit({...this.newData, page: 3 });
  }

  get monthlyPayment() {
    return this.detailsForm.get('monthly_repayment').value;
  }

  get loanAmount() {
    return this.detailsForm.get('loan_amount').value;
  }
  get loanDuration() {
    return this.detailsForm.get('duration').value;
  }

  recalculateOffer() {
    const formValue = this.detailsForm.value;
    const params = {
      amount: formValue.loan_amount,
      tenor: formValue.duration
    }
    this.loader.simpleLoader();
    this.service.recalculateLoanOffer(params).pipe().subscribe((data: any) => {
      console.log(data);
      this.newDetails = data;
      this.newData = { ...this.loanBreakdownData, tenor: data.tenor, fees: data.fees, loan_amount: data.amount, monthly_repayment: data.monthlyrepayment }
      // console.log(this.newData);
      this.loader.dismissLoader();
    }, () => {

      this.loader.dismissLoader();
    })
  }
}
