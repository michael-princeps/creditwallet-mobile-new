import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanApplicationPageRoutingModule } from './loan-application-routing.module';

import { LoanApplicationPage } from './loan-application.page';
import { ApplicationSteppersModule } from '../steppers/application-steppers.module';
import {MediaCapture} from '@ionic-native/media-capture/ngx';
import {File} from '@awesome-cordova-plugins/file/ngx'
// import {FileOpener} from '@awesome-cordova-plugins/file-opener/ngx'
import {FilePath} from '@awesome-cordova-plugins/file-path/ngx'
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ApplicationSteppersModule,
    LoanApplicationPageRoutingModule
  ],
  providers: [
    MediaCapture, File, FilePath, AndroidPermissions,LocalNotifications
  ],
  declarations: [LoanApplicationPage]
})
export class LoanApplicationPageModule {}
