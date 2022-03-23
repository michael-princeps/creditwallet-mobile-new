import { trigger, style, animate, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { LoanApplicationPage } from '../loan-application/loan-application.page';

@Component({
  selector: 'app-loan-auto-disburse-application',
  templateUrl: './loan-auto-disburse-application.page.html',
  styleUrls: ['./loan-auto-disburse-application.page.scss'],
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
export class LoanAutoDisburseApplicationPage implements OnInit {
  nextPage: LoanApplicationPage
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
  constructor(private modalController: ModalController, private activatedRoute: ActivatedRoute, private loaderService: LoaderService, private service: MainService, private router: Router, public alertController: AlertController) { }

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
    this.router.navigate(['/'], {replaceUrl: true})
  }

  get pageData$() {
    return this.currentPageSubject.asObservable();
  }

  goToNextPage(pageData) {
    let currentData = this.currentPageSubject.getValue();
    this.currentStep = currentData.page + 1;
    const newObject = { ...currentData, page: this.currentStep, ...pageData }
    this.loanDetails = newObject;
    console.log(newObject)
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
        return ''
      case 2:
        return 'Loan Breakdown'
      case 3:
        return 'Personal Information'
      case 4:
        return 'Contact Information'
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
            console.log('Confirm Cancel: blah');
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
    console.log('onDidDismiss resolved with role', role);
  }
}
