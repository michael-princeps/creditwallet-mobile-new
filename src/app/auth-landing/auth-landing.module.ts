import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthLandingPageRoutingModule } from './auth-landing-routing.module';

import { AuthLandingPage } from './auth-landing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthLandingPageRoutingModule
  ],
  declarations: [AuthLandingPage]
})
export class AuthLandingPageModule {}
