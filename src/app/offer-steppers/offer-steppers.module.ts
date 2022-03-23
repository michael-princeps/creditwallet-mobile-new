import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from  'ng-otp-input';
import { EnterOtpStepperComponent } from './components/enter-otp-stepper/enter-otp-stepper.component';
import { IonicModule } from '@ionic/angular';
import { OfferBreakdownStepperComponent } from './components/offer-breakdown-stepper/offer-breakdown-stepper.component';
import { OfferSelfieStepperComponent } from './components/offer-selfie-stepper/offer-selfie-stepper.component';
import { OfferAccountStepperComponent } from './components/offer-account-stepper/offer-account-stepper.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfferUploadIdStepperComponent } from './components/offer-upload-id-stepper/offer-upload-id-stepper.component';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';


@NgModule({
  declarations: [EnterOtpStepperComponent, OfferBreakdownStepperComponent, 
    OfferSelfieStepperComponent, 
    OfferAccountStepperComponent,
    OfferUploadIdStepperComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    NgOtpInputModule
  ],
  providers: [Chooser],
  exports: [EnterOtpStepperComponent, OfferBreakdownStepperComponent, 
    OfferSelfieStepperComponent, OfferAccountStepperComponent, 
    OfferUploadIdStepperComponent]
})
export class OfferSteppersModule { }
