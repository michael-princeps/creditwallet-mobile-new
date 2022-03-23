import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-offer-breakdown-stepper',
  templateUrl: './offer-breakdown-stepper.component.html',
  styleUrls: ['./offer-breakdown-stepper.component.scss'],
})
export class OfferBreakdownStepperComponent implements OnInit, ViewDidLeave {
  @Output() goNextEmitter = new EventEmitter();
  @Input() loanOfferID: string;
  loanDetails: any;
  destroy$ = new Subject<boolean>();
  showError: boolean;
  constructor(private service: MainService, private loader: LoaderService) { }

  ngOnInit() {
    this.fetchInitialOffer()
  }

  ionViewDidLeave(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchInitialOffer() {
    this.loader.simpleLoader();
    this.showError = false;
    this.service.fetchInitialOffer(this.loanOfferID).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.loader.dismissLoader();
      this.loanDetails = data.loan;
      this.showError = false;
    }, () =>  {
      this.showError = true;
      this.loader.dismissLoader()
    })
  }

  goNext() {
    this.goNextEmitter.emit({...this.loanDetails, page: 3});
  }
}
