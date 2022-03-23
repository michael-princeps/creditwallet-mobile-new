import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { EmailComposer } from 'capacitor-email-composer'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  resetPasswordForm: FormGroup;
  passwordSent = false;
  loading = false;
  destroy$ = new Subject<boolean>();
  constructor(private fb: FormBuilder, private modalController: ModalController, private authService: AuthenticationService) { }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      username: [null, Validators.required]
    })
  }

  get formControls() {
    return this.resetPasswordForm.controls
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.loading = true
      this.passwordSent = false;
      this.authService.resetAccountPassword(this.resetPasswordForm.value).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.loading = false;
        this.passwordSent = true;
        this.resetPasswordForm.reset();
      }, (error: HttpErrorResponse) => {
        this.loading = false
        this.passwordSent = false;
        this.resetPasswordForm.setErrors({
          message: error.error.message ? error.error.message: 'Unable to reset your account right now. Please contact admin'
        })
      })
    } else {
      Object.values(this.resetPasswordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  closeModal() {
    this.modalController.dismiss()
  }

  async openEmail() {
    const isValid = await EmailComposer.hasAccount();
    let email: any = {
      to: 'support@creditwallet.ng',
      cc: 'support@creditwallet.ng',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      subject: 'Can not reset my account',
      body: 'Hi team, please I need help with resetting my account',
      isHtml: true
    }
    if (isValid) {
      EmailComposer.open(email)
    }
  }
}
