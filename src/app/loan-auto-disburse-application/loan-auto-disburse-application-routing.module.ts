import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanAutoDisburseApplicationPage } from './loan-auto-disburse-application.page';

const routes: Routes = [
  {
    path: '',
    component: LoanAutoDisburseApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanAutoDisburseApplicationPageRoutingModule {}
