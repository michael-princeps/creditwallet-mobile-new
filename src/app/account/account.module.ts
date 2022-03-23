import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { SupportMethodsModule } from '../components/support-methods/support-methods.module';
import {CallNumber} from '@ionic-native/call-number/ngx'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportMethodsModule,
    AccountPageRoutingModule
  ],
  providers: [CallNumber],
  declarations: [AccountPage]
})
export class AccountPageModule {}
