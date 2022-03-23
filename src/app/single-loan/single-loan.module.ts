import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleLoanPageRoutingModule } from './single-loan-routing.module';

import { SingleLoanPage } from './single-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SingleLoanPageRoutingModule
  ],
  declarations: [SingleLoanPage]
})
export class SingleLoanPageModule {}
