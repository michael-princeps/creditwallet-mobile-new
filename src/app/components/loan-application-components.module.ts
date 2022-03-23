import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanApplicationBaseComponent } from './loan-application-base/loan-application-base.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MediaCapture} from '@ionic-native/media-capture/ngx';
import {File} from '@awesome-cordova-plugins/file/ngx'
// import {FileOpener} from '@awesome-cordova-plugins/file-opener/ngx'
import {FilePath} from '@awesome-cordova-plugins/file-path/ngx'
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';


@NgModule({
  declarations: [LoanApplicationBaseComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  providers: [MediaCapture, File, FilePath, AndroidPermissions],
  exports: [LoanApplicationBaseComponent]
})
export class LoanApplicationComponentsModule { }
