import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController, AlertController, ViewDidEnter, Platform } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.page.html',
  styleUrls: ['./view-offer.page.scss'],
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
export class ViewOfferPage implements OnInit, ViewDidEnter {
  offerId: string;
  currentStep = 1;
  cameraActive = false;
  image: string;
  showCameraModal: boolean;
  currentPageSubject = new BehaviorSubject<any>({ page: 1 });
  enterPercentage = '100%';
  leavePercentage = '-100%';
  loanDetails: any;
  destroy$ = new Subject<boolean>()

  constructor(private route: ActivatedRoute, private platform: Platform, private loader: LoaderService, private router: Router, public alertController: AlertController) { 
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.platform.pause.subscribe(async () => {
    //   this.closeApplication();
    // })
   
  }

  ngOnInit() {
    this.loader.dismissLoader();
    this.route.params.subscribe((param: Params) => {
      this.offerId = param.id;
      alert(this.offerId)
      console.log('enter')
      this.currentPageSubject.next({ page: 1 })
    })
    console.log('enter init')
    // this.offerId = this.route.snapshot.paramMap.get('id');
  }

  ionViewDidEnter(): void {
   
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

  closeApplication() {
    this.router.navigate(['/main/dashboard'], { replaceUrl: true })
  }

  get stepperTitle() {
    switch (this.currentStep) {
      case 1:
        return 'Authorization'
      case 2:
        return 'Confirm Details'
      case 3:
        return 'Selfie'
      case 4:
        return 'Bank Details'
      case 5:
        return 'Upload ID'
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
            this.closeApplication()
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

}
