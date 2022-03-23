import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanAutoDisburseApplicationPageRoutingModule } from './loan-auto-disburse-application-routing.module';

import { LoanAutoDisburseApplicationPage } from './loan-auto-disburse-application.page';
import { ApplicationSteppersModule } from '../steppers/application-steppers.module';
import {MediaCapture} from '@ionic-native/media-capture/ngx';
import {File} from '@awesome-cordova-plugins/file/ngx'
// import {FileOpener} from '@awesome-cordova-plugins/file-opener/ngx'
import {FilePath} from '@awesome-cordova-plugins/file-path/ngx'
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationSteppersModule,
    LoanAutoDisburseApplicationPageRoutingModule
  ],
  providers: [
    MediaCapture, File, FilePath, AndroidPermissions
  ],
  declarations: [LoanAutoDisburseApplicationPage]
})
export class LoanAutoDisburseApplicationPageModule {}
