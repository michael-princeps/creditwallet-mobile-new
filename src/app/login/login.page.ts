import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import {
  AvailableResult,
  BiometryType,
  NativeBiometric,
} from 'capacitor-native-biometric';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { AuthenticationService } from '../services/authentication.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hasBioAuth = false;
  showFallBack = true;
  showAuthLogin = false;
  hasFaceID = false;
  hasTouchId = false;
  loginForm: FormGroup;
  hasFingerPrint = false;
  destroy$ = new Subject<boolean>();
  showPassword = false;
  constructor(private modalController: ModalController, private loaderService: LoaderService, fb: FormBuilder, private authService: AuthenticationService, private router: Router, private toaster: ToastService, public alertController: AlertController) {
    this.loginForm = fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  async ngOnInit() {
    // console.log('log in')
  }


  get formControls() {
    return this.loginForm.controls
  }

  closeAndNavigate() {
    return this.modalController.dismiss()
  }


  performManualLogin() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      this.loaderService.simpleLoader();
      this.authService.logUserIn(this.loginForm.value).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        // this.closeAndNavigate().then(() => this.router.navigate(['/main'], { replaceUrl: true }))
        this.initialLogin(formValues)
      }, (e) => {
        this.loginForm.setErrors({
          message: e.error.message ? e.error.message: 'Unable to log in right now. Please contact admin'
        })
      })
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  initialLogin(params: { username: string, password: string }) {
    NativeBiometric.setCredentials({
      server: 'accounts.creditwallet.ng',
      username: params.username,
      password: params.password
    }).then(() => {
      this.loaderService.dismissLoader();
      this.router.navigate(['/main/dashboard'], { replaceUrl: true })
    }, () => {
      this.loaderService.dismissLoader();
      this.router.navigate(['/main/dashboard'], { replaceUrl: true })
    })
  }

  setFocus(nextElement) {
    nextElement.setFocus(); //For Ionic 4
    //nextElement.focus(); //older version
  }

  togglePasswordInput() {
    this.showPassword = !this.showPassword
  }

  async presentResetPasswordModal() {
    const modal = await this.modalController.create({
      component: ForgotPasswordPage,
      backdropDismiss: false,
      swipeToClose: false,
      initialBreakpoint: 1,
      handle: false,
      // breakpoints: [0, 1]
    });
    return await modal.present()
  }
}
