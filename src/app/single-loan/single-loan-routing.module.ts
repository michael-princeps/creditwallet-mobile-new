import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleLoanPage } from './single-loan.page';

const routes: Routes = [
  {
    path: '',
    component: SingleLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleLoanPageRoutingModule {}
