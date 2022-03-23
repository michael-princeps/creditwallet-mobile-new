import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnauthenticatedPagePage } from './unauthenticated-page.page';

const routes: Routes = [
  {
    path: '',
    component: UnauthenticatedPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnauthenticatedPagePageRoutingModule {}
