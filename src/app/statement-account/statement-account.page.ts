import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewDidLeave } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { MainService } from '../services/main.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-statement-account',
  templateUrl: './statement-account.page.html',
  styleUrls: ['./statement-account.page.scss'],
})
export class StatementAccountPage implements OnInit, ViewDidLeave {
  showIndebtednessModal = false;
  showDebtednessModal = false;
  shouldBackdropDismiss = true;
  user: any;
  email: any;
  emailForm: FormGroup;
  destroy$ = new Subject<boolean>()
  showDebtednessModalTitle: string;
  loading = false;
  constructor(authService: AuthenticationService, private toaster: ToastService, private service: MainService, private fb: FormBuilder) {
    authService.userObject.subscribe((user) => this.user = user)
  }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  ionViewDidLeave(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  get formControls() {
    return this.emailForm.controls
  }

  openDebtednessModal(title: string) {
    this.showDebtednessModal = true;
    this.showDebtednessModalTitle = title
  }

  closeModal() {
    this.showDebtednessModal = false;
    this.emailForm.reset();
  }

  handleRequestStatement() {
    if (this.emailForm.valid) {
      const formValues = Object.assign(this.emailForm.value, {loanid: this.user.borrower_unique_number});
      this.shouldBackdropDismiss = false;
      this.loading = true;
        this.service.requestAccountStatement(formValues, this.showDebtednessModalTitle).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
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
}
