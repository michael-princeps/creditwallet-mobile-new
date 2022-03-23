import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { IonNav } from '@ionic/angular';
import { LoanApplicationPage } from 'src/app/loan-application/loan-application.page';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-auto-disburse-stepper',
  templateUrl: './auto-disburse-stepper.component.html',
  styleUrls: ['./auto-disburse-stepper.component.scss'],
})
export class AutoDisburseStepperComponent implements OnInit {
  @Output() goNextEmitter = new EventEmitter();
  loanForm: FormGroup;
  customActionSheetOptions: any = {
    header: 'Select duration',
  };
  constructor(private fb: FormBuilder, private router: Router, private loaderService: LoaderService, private service: MainService) { }

  ngOnInit() {
    this.loanForm = this.fb.group({
      ippis_number: [null, Validators.required],
      telephone: [null, Validators.required]
    })
  }
  get formControls() {
    return this.loanForm.controls;
  }

  goToNext() {
    if (this.loanForm.valid) {
      const formValue = this.loanForm.value;
      this.loaderService.simpleLoader();
      this.service.calculateAutoDisburseLoanOffer(formValue).subscribe((data) => {
        this.loaderService.dismissLoader();
        this.goNextEmitter.emit(data);
      }, (error: HttpErrorResponse) => {
        this.loaderService.dismissLoader();
        if (error.status == 400) {
          console.log(error);
          // this.nav.push(LoanApplicationPage)
          this.router.navigate(['/start'], {replaceUrl: true, queryParamsHandling: 'preserve'})
        }
      })
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
