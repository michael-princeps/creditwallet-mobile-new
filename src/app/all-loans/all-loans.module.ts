import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllLoansPageRoutingModule } from './all-loans-routing.module';

import { AllLoansPage } from './all-loans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AllLoansPageRoutingModule
  ],
  declarations: [AllLoansPage]
})
export class AllLoansPageModule {}
