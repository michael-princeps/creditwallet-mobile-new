import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanTopUpPageRoutingModule } from './loan-top-up-routing.module';

import { LoanTopUpPage } from './loan-top-up.page';
import { ApplicationSteppersModule } from '../steppers/application-steppers.module';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationSteppersModule,
    LoanTopUpPageRoutingModule
  ],
  providers: [
    LocalNotifications
  ],
  declarations: [LoanTopUpPage]
})
export class LoanTopUpPageModule {}
