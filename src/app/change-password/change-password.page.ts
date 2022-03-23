import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewDidLeave } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MainService } from '../services/main.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit, ViewDidLeave {
  changePasswordForm: FormGroup;
  loading = false;
  destroy$ = new Subject<boolean>();
  constructor(private fb: FormBuilder, private service: MainService, private toaster: ToastService) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      oldpassword: [null, Validators.required],
      newpassword: [null, Validators.required],
      password_confirmation: [null, this.confirmationValidator]
    })
  }

  ionViewDidLeave(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  get formControls() {
    return this.changePasswordForm.controls;
  }

  setFocus(nextElement) {
    nextElement.setFocus();
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.changePasswordForm.controls.password_confirmation.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.changePasswordForm.controls.newpassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  handleChangePassword() {
    if (this.changePasswordForm.valid) {
      this.loading = true;
      this.service.changeUserPassword(this.changePasswordForm.value).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.loading = false
      }, () => {
        this.loading = false
      })
    } else {
      Object.values(this.changePasswordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
