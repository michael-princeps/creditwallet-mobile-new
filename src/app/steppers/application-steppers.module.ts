import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoanAmountStepperComponent } from './components/loan-amount-stepper/loan-amount-stepper.component';
import { LoanBreakdownStepperComponent } from './components/loan-breakdown-stepper/loan-breakdown-stepper.component';
import { PersonalInformationStepperComponent } from './components/personal-information-stepper/personal-information-stepper.component';
import { ContactInformationStepperComponent } from './components/contact-information-stepper/contact-information-stepper.component';
import { EmploymentInformationStepperComponent } from './components/employment-information-stepper/employment-information-stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoDisburseStepperComponent } from './components/auto-disburse-stepper/auto-disburse-stepper.component';
import { AutoDisburseBreakdownStepperComponent } from './components/auto-disburse-breakdown-stepper/auto-disburse-breakdown-stepper.component';
import { VideoCaptureComponent } from './components/video-capture/video-capture.component';
import { ImageCaptureComponent } from './components/image-capture/image-capture.component';
import { AutoDisbursePersonalStepperComponent } from './components/auto-disburse-personal-stepper/auto-disburse-personal-stepper.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { StepperOneComponent } from './components/stepper-one/stepper-one.component';
import { StepperTwoComponent } from './components/stepper-two/stepper-two.component';
import { StepperThreeComponent } from './components/stepper-three/stepper-three.component';
import { StepperFourComponent } from './components/stepper-four/stepper-four.component';

@NgModule({
  declarations: [
    LoanAmountStepperComponent,
    ContactInformationStepperComponent,
    LoanBreakdownStepperComponent,
    PersonalInformationStepperComponent,
    EmploymentInformationStepperComponent,
    
    AutoDisburseStepperComponent,
    AutoDisburseBreakdownStepperComponent,
    VideoCaptureComponent,
    ImageCaptureComponent,
    AutoDisbursePersonalStepperComponent,
    StepperOneComponent,
    StepperTwoComponent,
    StepperThreeComponent,
    StepperFourComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonicSelectableModule,
  ],
  exports: [
    LoanAmountStepperComponent,
    ContactInformationStepperComponent,
    PersonalInformationStepperComponent,
    LoanBreakdownStepperComponent,
    EmploymentInformationStepperComponent,

    AutoDisburseStepperComponent,
    AutoDisburseBreakdownStepperComponent,
    VideoCaptureComponent,
    ImageCaptureComponent,
    AutoDisbursePersonalStepperComponent,
    StepperOneComponent,
    StepperTwoComponent,
    StepperThreeComponent,
    StepperFourComponent
  ],
})
export class ApplicationSteppersModule { }
