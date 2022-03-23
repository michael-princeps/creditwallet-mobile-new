import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOfferPageRoutingModule } from './view-offer-routing.module';

import { ViewOfferPage } from './view-offer.page';
import { OfferSteppersModule } from '../offer-steppers/offer-steppers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferSteppersModule,
    ViewOfferPageRoutingModule
  ],
  declarations: [ViewOfferPage]
})
export class ViewOfferPageModule {}
