import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';
import { SwiperModule } from 'swiper/angular';
import { SharedComponentsModule } from '../components/shared-components.module';
import { AuthLandingPageModule } from '../auth-landing/auth-landing.module';
import { LoanApplicationComponentsModule } from '../components/loan-application-components.module';
// import {MediaCapture} from '@ionic-native/media-capture/ngx';
// import {File} from '@awesome-cordova-plugins/file/ngx'
// import {VideoPlayer} from '@ionic-native/video-player'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    SharedComponentsModule,
    LoanApplicationComponentsModule,
    // AuthLandingPageModule,
    LandingPageRoutingModule
  ],
  declarations: [LandingPage]
})
export class LandingPageModule {}
