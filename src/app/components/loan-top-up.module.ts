import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanTopUpBaseComponent } from './loan-top-up-base/loan-top-up-base.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoanTopUpBaseComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ],
  exports: [
    LoanTopUpBaseComponent
  ]
})
export class LoanTopUpModule { }
