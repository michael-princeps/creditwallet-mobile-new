import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLandingPage } from './auth-landing.page';

const routes: Routes = [
  {
    path: '',
    component: AuthLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthLandingPageRoutingModule {}
