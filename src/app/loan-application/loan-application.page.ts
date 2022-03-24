import { trigger, style, animate, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { LoanAutoDisburseApplicationPage } from '../loan-auto-disburse-application/loan-auto-disburse-application.page';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.page.html',
  styleUrls: ['./loan-application.page.scss'],
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
export class LoanApplicationPage implements OnInit {
  currentStep = 1;
  cameraActive = false;
  image: string;
  showCameraModal: boolean;
  currentPageSubject = new BehaviorSubject<any>({ page: 1 });
  enterPercentage = '100%';
  leavePercentage = '-100%';
  loanDetails: any;
  destroy$ = new Subject<boolean>()
  code: any;
  // stepperTitle = 'Loan Amount'
  constructor(private modalController: ModalController, private loaderService: LoaderService, private service: MainService, private router: Router, public alertController: AlertController, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((param: any) => {
      this.code = param.code
    })
  }

  close() {
    // this.modalController.dismiss().then(() => {
    //   this.destroy$.next();
    //   this.destroy$.complete();
    // });
    this.router.navigate(['/'], { replaceUrl: true })
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
        return 'Phone Number'
      case 2:
        return 'IPPIS Number'
      case 3:
        return 'Loan Amount'
      case 4:
        return 'Loan Duration'
      case 5:
        return 'Loan Breakdown'

      case 6:
        return 'Personal Information'
      case 7:
        if (this.loanDetails.type == 1) {
          return 'Image Capture'
        } else {
          return 'Contact Information'
        }
      case 8:
        if (this.loanDetails.type == 1) {
          return 'Video Capture'
        } else {
          return 'Employment Information'
        }
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

  submitApplication(data) {
    let currentData = this.currentPageSubject.getValue();
    const newObject = { ...currentData, page: currentData.page + 1, ...data };
    this.loaderService.simpleLoader();
    this.service.applyForLoan(newObject).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.loanDetails = null;
      this.loaderService.dismissLoader();
      this.currentStep = currentData.page + 1;
      this.currentPageSubject.next({ page: 9 });
    }, () => this.loaderService.dismissLoader())
  }

  getLoanOffer(durationStepperData) {
    let currentData = this.currentPageSubject.getValue();
    let newLoanObject = { ...currentData, ...durationStepperData };
    const { ippis_number, telephone } = newLoanObject;
    // console.log(newLoanObject)
    this.loaderService.simpleLoader();
    this.service.calculateAutoDisburseLoanOffer({ ippis_number, telephone }).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.loanDetails = null;
      this.loaderService.dismissLoader();
      this.currentStep = currentData.page + 1;
      const newObject = { ...currentData, page: this.currentStep, ...durationStepperData, ...data, type: 1 }
      this.loanDetails = newObject;
      this.currentPageSubject.next(newObject)
    }, () => {
      const param = {
        amount: newLoanObject.loanamount,
        tenor: newLoanObject.tenor
      }
      this.loaderService.simpleLoader();
      this.service.calculateLoanOffer(param).subscribe((data) => {
        this.loaderService.dismissLoader();
        this.currentStep = currentData.page + 1;
        const loanBreakdown = { ...currentData, page: this.currentStep, ...durationStepperData, type: 2, monthly_repayment: data.monthlyrepayment, loan_amount: param.amount, tenor: param.tenor, ...data };
        this.loanDetails = loanBreakdown;
        // console.log(loanBreakdown)
        this.currentPageSubject.next(loanBreakdown)
      }, () => this.loaderService.dismissLoader())
    })
  }
}
