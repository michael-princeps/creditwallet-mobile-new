import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOfferPageRoutingModule } from './view-offer-routing.module';

import { ViewOfferPage } from './view-offer.page';
import { OfferSteppersModule } from '../offer-steppers/offer-steppers.module';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferSteppersModule,
    ViewOfferPageRoutingModule
  ],
  providers: [LocalNotifications],
  declarations: [ViewOfferPage]
})
export class ViewOfferPageModule {}
