import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ViewLoanResolverService } from './resolvers/view-loan-resolver.service';
import { AuthGuard } from './services/auth.guard';
import { IsLoggedInGuard } from './services/is-logged-in.guard';

const routes: Routes = [
  {
    path: 'main',
    canLoad: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'auth-landing',
    loadChildren: () => import('./auth-landing/auth-landing.module').then( m => m.AuthLandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./loan-application/loan-application.module').then( m => m.LoanApplicationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'unauthenticated',
    loadChildren: () => import('./unauthenticated-page/unauthenticated-page.module').then( m => m.UnauthenticatedPagePageModule)
  },
  {
    path: 'loan-top-up',
    loadChildren: () => import('./loan-top-up/loan-top-up.module').then( m => m.LoanTopUpPageModule)
  },
  {
    path: 'loan-auto-disburse-application',
    loadChildren: () => import('./loan-auto-disburse-application/loan-auto-disburse-application.module').then( m => m.LoanAutoDisburseApplicationPageModule)
  },
  {
    path: 'offer/:id',
    loadChildren: () => import('./view-offer/view-offer.module').then( m => m.ViewOfferPageModule)
  },
  {
    path: '',
    canLoad: [IsLoggedInGuard],
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: '**',
    redirectTo: 'main/dashboard',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
