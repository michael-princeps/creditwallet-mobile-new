import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatementAccountPageRoutingModule } from './statement-account-routing.module';

import { StatementAccountPage } from './statement-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StatementAccountPageRoutingModule
  ],
  declarations: [StatementAccountPage]
})
export class StatementAccountPageModule {}
