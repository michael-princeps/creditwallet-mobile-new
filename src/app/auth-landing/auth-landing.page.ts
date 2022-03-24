import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoanApplicationBaseComponent } from '../components/loan-application-base/loan-application-base.component';
import { LoanApplicationPage } from '../loan-application/loan-application.page';
import { LoanAutoDisburseApplicationPageModule } from '../loan-auto-disburse-application/loan-auto-disburse-application.module';
import { LoanAutoDisburseApplicationPage } from '../loan-auto-disburse-application/loan-auto-disburse-application.page';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.page.html',
  styleUrls: ['./auth-landing.page.scss'],
})
export class AuthLandingPage implements OnInit {
  nextPage = LoginPage;
  @Output() modalResizeEmitter = new EventEmitter()
  timeHours = new Date().getHours();
  constructor(private modalController: ModalController, private router: Router) { }

  ngOnInit() {
  }

  resizeEmiiter() {
    this.modalResizeEmitter.emit(0.85)
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoanApplicationBaseComponent,
      backdropDismiss: false,
      swipeToClose: false,
      initialBreakpoint: 1,
      componentProps: {
        rootPage: LoanAutoDisburseApplicationPage
      },
      handle: false,
    });
    return await modal.present()
  }

  async presentLoginModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      backdropDismiss: false,
      swipeToClose: false,
      initialBreakpoint: 1,
      handle: false,
      // breakpoints: [0, 1]
    });
    return await modal.present()
  }


  closeAndNavigate(url) {
    // console.log(url)
    this.modalController.dismiss().then(() => this.router.navigate([`/${url}`]))
  }

  closeAndNavigateToLogin() {
    this.modalController.dismiss().then(() => this.router.navigate([`/login`]))
  }


  get TimeOfDay() {
    if (this.timeHours < 12) {
      return 'Good Morning';
    } else if (this.timeHours >= 12 && this.timeHours <= 17) {
      return 'Good Afternoon';
    } else if (this.timeHours >= 17 && this.timeHours <= 24) {
      return 'Good Evening';
    } else {
      return 'Good Day';
    }
  }

}
