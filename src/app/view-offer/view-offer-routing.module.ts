import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOfferPage } from './view-offer.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOfferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewOfferPageRoutingModule {}
