import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportMethodsComponent } from './support-methods.component';
import { IonicModule } from '@ionic/angular';
// import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import {CallNumber} from '@ionic-native/call-number/ngx'



@NgModule({
  declarations: [SupportMethodsComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot({
      // mode: 'ios'
    })
  ],
  providers: [
    CallNumber
  ],
  exports: [
    SupportMethodsComponent
  ]
})
export class SupportMethodsModule { }
