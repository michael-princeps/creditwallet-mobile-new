import { Component, OnInit } from '@angular/core';
import { ModalController, ViewDidLeave } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoanTopUpBaseComponent } from '../components/loan-top-up-base/loan-top-up-base.component';
import { AuthenticationService } from '../services/authentication.service';
import { LoaderService } from '../services/loader.service';
import { MainService } from '../services/main.service';
import { ActionSheetController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from 'capacitor-email-composer'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, ViewDidLeave {
  showBalance = true;
  showSupportModal = false;
  showLiquidationModal = false;
  destroy$ = new Subject<boolean>()
  dashboardData: any;
  openLoans: any;
  repayments: any[];
  refresherEvent: any;
  user: any;
  constructor(private callNumber: CallNumber, private authService: AuthenticationService, public actionSheetController: ActionSheetController, public modalController: ModalController, private service: MainService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.authService.userObject.subscribe((user) => this.user = user.user)
    this.fetchDashboard()
  }

  ionViewDidLeave(): void {
      this.destroy$.next();
      this.destroy$.complete()
      if (this.refresherEvent) {
        this.refresherEvent.target.complete()
      }
  }

  toggleBalance() {
    this.showBalance =! this.showBalance
  }

  openSupportModal() {
    
  }

  fetchDashboard() {
    this.loaderService.simpleLoader();
    this.service.getDashboard().subscribe((data: any) => {
      // console.log(data);
      this.loaderService.dismissLoader();
      this.dashboardData = data;
      this.openLoans = data.open_loan;
      this.repayments = data.repayments;
    }, () => this.loaderService.dismissLoader())
  }

  refreshDashboard(event) {
    this.refresherEvent = event
    this.service.getDashboard().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      // console.log(data);
      this.dashboardData = data;
      this.openLoans = data.open_loan;
      this.repayments = data.repayments;
      event.target.complete()
    }, () => event.target.complete())
  }

  async presentApplyModal() {
    const modal = await this.modalController.create({
      component: LoanTopUpBaseComponent,
      backdropDismiss: false,
      swipeToClose: false,
      initialBreakpoint: 1,
      handle: false,
      // breakpoints: [0, 1]
    });
    return await modal.present()
  }

  getRepaymentType(methodID) {
    switch (methodID) {
      case 17471:
        return 'Cash Deposit';
      case 17472:
        return 'Refund';
      case 17473:
        return 'Cheque';
      case 17474:
        return 'Remita Salary Platform (RSP)';
      case 17475:
        return 'Online Transfer';
      case 18088:
        return 'System Generated';
      case 20253:
        return 'Direct Debit (Paystack, Remita, Etc)';
      case 38759:
        return 'Deduction from new loan';
      case 39643:
        return 'IPPIS Deduction';
      case 40815:
        return 'Deduction from CW Salary Source';
      case 50019:
        return 'Disbursement in error';
      case 53176:
        return 'Deduction from Deposit Investment';
      case 69509:
        return 'Repayment Transfer"';
      default:
        return 'Cash Deposit';
    }
  } 


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Support Help',
      cssClass: 'my-custom-class',
      buttons: [ 
        {
        text: 'Call 07085698828',
        // icon: 'call',
        handler: () => {
          this.openDialer()
        }
      }, {
        text: 'Send a mail',
        // icon: 'mail',
        data: 'Data value',
        handler: () => {
          this.openEmail()
        },
      },
      {
        text: 'Cancel',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }
    ]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    // console.log('onDidDismiss resolved with role and data', role, data);
  }

  openDialer() {
    this.callNumber.callNumber("07085698828", true)
      // .then(res => console.log('Call placed'))
      // .catch(err => console.log('Error launching dialer', err));
  }

  async openEmail() {
    const isValid = await EmailComposer.hasAccount();
    let email: any = {
      to: 'support@creditwallet.ng',
      cc: 'support@creditwallet.ng',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      subject: 'I need assistance',
      body: 'Hi team, please I need help',
      isHtml: true
    }
    if (isValid) {
      EmailComposer.open(email)
    }
  }
}
