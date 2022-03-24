import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tenors } from 'src/app/extra/duration';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-loan-amount-stepper',
  templateUrl: './loan-amount-stepper.component.html',
  styleUrls: ['./loan-amount-stepper.component.scss'],
})
export class LoanAmountStepperComponent implements OnInit {
  @Output() goNextEmitter = new EventEmitter();
  loanForm: FormGroup;
  customActionSheetOptions: any = {
    header: 'Select duration',
  };
  tenors = tenors;
  constructor(private fb: FormBuilder, private loaderService: LoaderService, private service: MainService) { }

  ngOnInit() {
    this.loanForm = this.fb.group({
      loan_amount: [null, Validators.required],
      tenor: [null, Validators.required]
    })
  }
  get formControls() {
    return this.loanForm.controls;
  }

  goToNext() {
    if (this.loanForm.valid) {
      const formValue = this.loanForm.value;
      formValue.amount = formValue.loan_amount;
      this.loaderService.simpleLoader();
      this.service.calculateLoanOffer(formValue).subscribe((data) => {
        this.loaderService.dismissLoader();
        const loanBreakdown = {monthly_repayment: data.monthlyrepayment, loan_amount: formValue.amount,  tenor: formValue.tenor, ...data,  page: 2, type: 2};
      this.goNextEmitter.emit(loanBreakdown);
      }, () => this.loaderService.dismissLoader())
    } else {
      Object.values(this.loanForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  setFocus(nextElement) {
    nextElement.open(); //For Ionic 4
    //nextElement.focus(); //older version
  }

}
