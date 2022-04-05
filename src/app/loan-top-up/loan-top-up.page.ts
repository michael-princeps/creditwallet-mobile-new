import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { LoaderService } from '../services/loader.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-loan-top-up',
  templateUrl: './loan-top-up.page.html',
  styleUrls: ['./loan-top-up.page.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 1, transform: 'translateX({{enter}})', position: 'absolute', width: '100%', top: 0 }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 1, transform: 'translateX({{leave}})', position: 'absolute', width: '100%', top: 0 }))
      ])
    ])
  ]
})
export class LoanTopUpPage implements OnInit {
  currentStep = 1;
  cameraActive = false;
  image: string;
  showCameraModal: boolean;
  currentPageSubject = new BehaviorSubject<any>({ page: 1 });
  enterPercentage = '100%';
  leavePercentage = '-100%';
  loanDetails: any;
  buttonText = 'Submit'
  destroy$ = new Subject<boolean>()
  user: any;
  
  constructor(private modalController: ModalController, private loaderService: LoaderService, private service: MainService,  private authService: AuthenticationService, public alertController: AlertController) { }

  ngOnInit() {
    this.authService.userObject.subscribe((user) => this.user = user)
  }

  // showSuccessNotification() {
  //   this.localNotifications.schedule({
  //     title: 'Top up request in progress',
  //     text: 'Top up request in review. Please hold on for a response',
  //     trigger: {at: new Date(new Date().getTime() + 3000)},
  //     // group: 'loan-application'
  //  });
  // }

  close() {
    this.modalController.dismiss().then(() => {
      this.destroy$.next();
      this.destroy$.complete();
    });
    // this.router.navigate(['/'])
  }

  get pageData$() {
    return this.currentPageSubject.asObservable();
  }

  goToNextPage(pageData) {
    let currentData = this.currentPageSubject.getValue();
    this.currentStep = currentData.page + 1;
    const newObject = { ...currentData, page: this.currentStep, ...pageData }
    this.loanDetails = newObject;
    // console.log(newObject)
    this.currentPageSubject.next(newObject)
  }

  goToPrevious() {
    let currentData = this.currentPageSubject.getValue();
    this.currentStep = currentData.page - 1;
    const newObject = { ...currentData, page: this.currentStep }
    this.currentPageSubject.next(newObject)
  }

  get stepperTitle() {
    switch (this.currentStep) {
      case 1:
        return 'Loan Amount'
      case 2:
        return 'Loan Breakdown'
      default:
        return 'Success!'
    }
  }

  async presentCancelAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cancel Application?',
      message: 'Do you want to cancel and lose all your progress?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          id: 'confirm-button',
          handler: () => {
            this.close()
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
  

  submitApplication() {
    let currentData = this.currentPageSubject.getValue();
    // const newObject = { ...currentData, page: currentData.page + 1, ...data };
    const newObject = Object.assign(currentData, {
      telephone: this.user.borrower_mobile,
      email: this.user.borrower_email,
      title: this.user.borrower_title,
      gender: this.user.borrower_gender,
      firstname: this.user.borrower_firstname,
      lastname: this.user.borrower_lastname,
      city: this.user.borrower_city,
      state: this.user.borrower_province,
      place_of_work: this.user.borrower_business_name,
      house_address: this.user.borrower_address,
      salary_bank_name: this.user.custom_field_1168,
      salary_bank_account: this.user.custom_field_1169,
      dob: this.user.borrower_dob
    })
    this.loaderService.simpleLoader();
    this.service.applyForLoan(newObject).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.loanDetails = null;
      this.loaderService.dismissLoader();
    this.currentStep = currentData.page + 1;
      this.currentPageSubject.next({ page: 3 });
      // this.showSuccessNotification()
    }, () => this.loaderService.dismissLoader())
  }

}
