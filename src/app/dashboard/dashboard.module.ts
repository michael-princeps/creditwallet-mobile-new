import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SupportMethodsModule } from '../components/support-methods/support-methods.module';
import { LoanTopUpModule } from '../components/loan-top-up.module';
import {CallNumber} from '@ionic-native/call-number/ngx'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // ReactiveFormsModule,
    IonicModule,
    LoanTopUpModule,
    SupportMethodsModule,
    DashboardPageRoutingModule
  ],
  providers: [
    CallNumber
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
