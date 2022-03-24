import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewLoanResolverService } from '../resolvers/view-loan-resolver.service';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'loans',
        loadChildren: () => import('../all-loans/all-loans.module').then(m => m.AllLoansPageModule)
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
          },
          {
            path: 'security-settings',
            loadChildren: () => import('../security-settings/security-settings.module').then(m => m.SecuritySettingsPageModule)
          },
          {
            path: 'change-password',
            loadChildren: () => import('../change-password/change-password.module').then(m => m.ChangePasswordPageModule)
          },
          {
            path: 'statement-account',
            loadChildren: () => import('../statement-account/statement-account.module').then(m => m.StatementAccountPageModule)
          },
        ]
      },
      {
        path: 'single-loan/:id',
        resolve: {
          loanDetails: ViewLoanResolverService
        },
        loadChildren: () => import('../single-loan/single-loan.module').then(m => m.SingleLoanPageModule)
      },
      {
        path: 'loan-top-up',
        loadChildren: () => import('../loan-top-up/loan-top-up.module').then(m => m.LoanTopUpPageModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'main/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
