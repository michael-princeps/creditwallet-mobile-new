import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatementAccountPage } from './statement-account.page';

const routes: Routes = [
  {
    path: '',
    component: StatementAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatementAccountPageRoutingModule {}
