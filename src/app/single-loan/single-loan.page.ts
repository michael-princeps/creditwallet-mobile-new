import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ViewDidLeave } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { MainService } from '../services/main.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-single-loan',
  templateUrl: './single-loan.page.html',
  styleUrls: ['./single-loan.page.scss'],
})
export class SingleLoanPage implements OnInit, ViewDidLeave {
  showDetailsModal = false
  loan_id: any;
  destroy$ = new Subject<boolean>();
  loanDetails: any;
  loanObject: any;
  repayments: any[];
  refresherEvent: any;
  emailForm: FormGroup;
  showLiquidationModal = false;
  statementModal = false;
  shouldBackdropDismiss = true;
  loading = false
  singleLoan: any;
  constructor(private activatedRoute: ActivatedRoute, private toaster: ToastService, private fb: FormBuilder, private loaderService: LoaderService, private service: MainService) { 
    this.emailForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot)
    this.singleLoan = this.activatedRoute.snapshot.data['loanDetails'];
    this.loanDetails = this.singleLoan.loan_operation;
    this.loanObject = this.singleLoan.loan_operation.loan;
    this.repayments = this.singleLoan.loan_operation.repayments;
    // this.activatedRoute.params.subscribe((param: Params) => {
    //   this.loan_id = param.id;
    //   this.viewLoanDetails();
    // })
  }

  get formControls() {
    return this.emailForm.controls
  }

  ionViewDidLeave(): void {
      this.destroy$.next();
      this.destroy$.complete()
      if (this.refresherEvent) {
        this.refresherEvent.target.complete()
      }
  }

  closeModal() {
    this.showLiquidationModal = false;
    this.statementModal = false;
    this.emailForm.reset();
  }

  viewLoanDetails() {
    this.loaderService.simpleLoader();
    this.service.getSingleLoanDetails(this.loan_id).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      console.log(data)
      this.loaderService.dismissLoader();
      this.loanDetails = data.loan_operation;
      this.loanObject = data.loan_operation.loan;
      this.repayments = data.loan_operation.repayments;
    }, () => this.loaderService.dismissLoader())
  }

  refreshLoanDetails(event) {
    this.refresherEvent = event;
    this.service.getSingleLoanDetails(this.loanObject.loan_id).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      console.log(data)
      this.loanDetails = data.loan_operation;
      this.loanObject = data.loan_operation.loan;
      this.repayments = data.loan_operation.repayments;
      event.target.complete();
    }, () => event.target.complete())
  }
  
  
  handleRequestLiquidation() {
    if (this.emailForm.valid) {
      const formValues = Object.assign(this.emailForm.value, {loanid: this.loanObject.loan_application_id});
      this.shouldBackdropDismiss = false;
      this.loading = true;
        this.service.applyForLiquidation(formValues).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
          this.closeModal();
          this.loading = false;
          this.shouldBackdropDismiss = true;
          if (data.status == 'success') {
          this.toaster.presentToast('success', data.message)
          } else {
            this.toaster.presentToast('danger', data.message)
          }
        }, () => {
          this.loading = false;
          this.shouldBackdropDismiss = true
        })
    } else {
      Object.values(this.emailForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleRequestStatement() {
    if (this.emailForm.valid) {
      const formValues = Object.assign(this.emailForm.value, {loanid: this.loanObject.loan_application_id});
      this.shouldBackdropDismiss = false;
      this.loading = true;
        this.service.sendAccountStatement(formValues).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
          this.closeModal();
          this.loading = false;
          this.shouldBackdropDismiss = true;
          if (data.status == 'success') {
          this.toaster.presentToast('success', data.message)
          } else {
            this.toaster.presentToast('danger', data.message)
          }
        }, () => {
          this.loading = false;
          this.shouldBackdropDismiss = true
        })
    } else {
      Object.values(this.emailForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  getRepaymentType(methodID) {
    switch (methodID) {
      case 17471:
        return 'Cash Deposit';
      case 17472:
        return 'Refund';
      case 17473:
        return 'Cheque';
      case 17474:
        return 'Remita Salary Platform (RSP)';
      case 17475:
        return 'Online Transfer';
      case 18088:
        return 'System Generated';
      case 20253:
        return 'Direct Debit (Paystack, Remita, Etc)';
      case 38759:
        return 'Deduction from new loan';
      case 39643:
        return 'IPPIS Deduction';
      case 40815:
        return 'Deduction from CW Salary Source';
      case 50019:
        return 'Disbursement in error';
      case 53176:
        return 'Deduction from Deposit Investment';
      case 69509:
        return 'Repayment Transfer"';
      default:
        return 'Cash Deposit';
    }
  }
}
