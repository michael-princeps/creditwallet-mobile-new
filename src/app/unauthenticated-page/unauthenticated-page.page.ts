import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  selector: 'app-unauthenticated-page',
  templateUrl: './unauthenticated-page.page.html',
  styleUrls: ['./unauthenticated-page.page.scss'],
})
export class UnauthenticatedPagePage implements OnInit, AfterViewInit {
  hasBioAuth = false;
  showFallBack = true;
  showAuthLogin = false;
  hasFaceID = false;
  hasTouchId = false;
  loginForm: FormGroup;
  hasFingerPrint = false;
  destroy$ = new Subject<boolean>();
  showPassword = false;
  user: any;
  constructor(private modalController: ModalController, private loaderService: LoaderService, fb: FormBuilder, private authService: AuthenticationService, private router: Router, private toaster: ToastService, public alertController: AlertController) {
    this.loginForm = fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
    this.authService.userObject.subscribe((user) => this.user = user.user)
  }

  async ngOnInit() {
    const available = await NativeBiometric.isAvailable();
    this.hasBioAuth = available.isAvailable;
    this.hasFaceID = available.biometryType === BiometryType.FACE_ID;
    this.hasFingerPrint = available.biometryType === BiometryType.FINGERPRINT;
    this.hasTouchId = available.biometryType === BiometryType.TOUCH_ID
    console.log(this.hasBioAuth)
    if (this.hasBioAuth) {
      // this.openBioAuth();
      this.showAuthLogin = true;
    }
  }

  ngAfterViewInit(): void {
    this.loginForm.patchValue({username: this.user.borrower_unique_number})
  }

  async presentNoCredentialsAuth() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No credentials',
      message: 'Please log in manually so we can use your credentials for subsequent access',
      // buttons: ['OK'],
      buttons: [
        {
          text: 'OK',
          id: 'confirm-button',
          handler: () => {
            this.router.navigate(['/login'], { replaceUrl: true })
          }
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  openBioAuth() {
    NativeBiometric.getCredentials({
      server: 'accounts.creditwallet.ng',
    }).then((credential: any) => {
      NativeBiometric.verifyIdentity({
        reason: 'Log in to your account',
        title: 'Log in to your account'
      }).then(() => {
        this.performBioLogin(credential.username, credential.password)
      }, () => {
      }).catch((e) => console.log(e))
    }, () => {
      this.presentNoCredentialsAuth()
    }).catch((e) => {
      this.performManualLogin();
    })
  }

  get formControls() {
    return this.loginForm.controls
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

  performManualLogin() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      this.loaderService.simpleLoader();
      this.authService.logUserIn(this.loginForm.value).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.initialLogin(formValues)
      }, (e) => {
        this.loginForm.setErrors({
          message: e.error.message ? e.error.message : 'Unable to log in right now. Please contact admin'
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

  performBioLogin(username, password) {
    const params = {
      username,
      password
    }
    this.loaderService.simpleLoader();
    this.authService.logUserIn(params).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.initialLogin(params)
    })
  }

  setFocus(nextElement) {
    nextElement.setFocus(); //For Ionic 4
    //nextElement.focus(); //older version
  }

  togglePasswordInput() {
    this.showPassword = !this.showPassword
  }

  switchAccount() {
    this.authService.clearStorage().then(() => {
      this.router.navigate(['/'], { replaceUrl: true })
    }, () => this.router.navigate(['/'], { replaceUrl: true })
    ).catch((e) => console.log(e))
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
