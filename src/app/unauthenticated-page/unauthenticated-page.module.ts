import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnauthenticatedPagePageRoutingModule } from './unauthenticated-page-routing.module';

import { UnauthenticatedPagePage } from './unauthenticated-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UnauthenticatedPagePageRoutingModule
  ],
  declarations: [UnauthenticatedPagePage]
})
export class UnauthenticatedPagePageModule {}
