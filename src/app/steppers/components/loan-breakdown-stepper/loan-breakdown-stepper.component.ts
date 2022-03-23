import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'loan-breakdown-stepper',
  templateUrl: './loan-breakdown-stepper.component.html',
  styleUrls: ['./loan-breakdown-stepper.component.scss'],
})
export class LoanBreakdownStepperComponent implements OnInit, AfterViewInit {
  @Output() goNextEmitter = new EventEmitter();
  @Input() loanBreakdownData: any;
  @Input() btnText: string;
  detailsForm: FormGroup;
  newDetails: any;
  newData: any;
  monthlyPayment: any;
  loanAmount: any;
  loanDuration: any;
  constructor(private service: MainService, private loader: LoaderService, fb: FormBuilder) {
    this.detailsForm = fb.group({
      tenor: [null],
      fees: [null],
      loanamount: [null],
      monthly_repayment: [null]
    })
  }

  ngOnInit() {
    console.log(this.loanBreakdownData)
    this.loanAmount = this.loanBreakdownData.loanamount > this.loanBreakdownData.loan_amount ? this.loanBreakdownData.loan_amount: this.loanBreakdownData.loanamount;
    this.loanDuration = this.loanBreakdownData.tenor;
    this.monthlyPayment = this.loanBreakdownData.monthly_repayment;
  }

  ngAfterViewInit(): void {
    console.log(this.loanBreakdownData)
    if (this.loanBreakdownData.type == 1) {
      Object.keys(this.loanBreakdownData).forEach(key => {
        if (key == 'loanamount') {
          if (this.loanBreakdownData.loanamount > this.loanBreakdownData.loan_amount ) {
            this.detailsForm.patchValue({loanamount: this.loanBreakdownData.loan_amount  })
          } else {
            this.detailsForm.patchValue({loanamount: this.loanBreakdownData.loanamount  })
          }
        } else {
          this.detailsForm.patchValue({[key]: this.loanBreakdownData[key] })
        }
      })
      this.recalculateOffer();
    }
  }

  goToNext() {
    this.goNextEmitter.emit({ page: 6 });
  }

  // get monthlyPayment() {
  //   return this.detailsForm.get('monthly_repayment').value;
  // }

  // get loanAmount() {
  //   return this.detailsForm.get('loanamount').value;
  // }
  // get loanDuration() {
  //   return this.detailsForm.get('tenor').value;
  // }

  recalculateOffer() {
    const formValue = this.detailsForm.value;
    const params = {
      amount: formValue.loanamount,
      tenor: formValue.tenor
    }
    this.loanAmount = params.amount;
    this.loanDuration = params.tenor;
    this.loader.simpleLoader();
    this.service.recalculateLoanOffer(params).pipe().subscribe((data: any) => {
      console.log(data);
      this.newData = { ...this.loanBreakdownData, tenor: data.tenor, fees: data.fees, loan_amount: data.amount, monthly_repayment: data.monthlyrepayment };
      this.monthlyPayment = this.newData.monthly_repayment
      this.loader.dismissLoader();
    }, () => {
      this.loader.dismissLoader();
    })
  }

  goToAutoNext() {
    this.goNextEmitter.emit({ ...this.newData, page: 6 });
  }
}
