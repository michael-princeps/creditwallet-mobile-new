import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ViewDidLeave } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoanTopUpBaseComponent } from '../components/loan-top-up-base/loan-top-up-base.component';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-all-loans',
  templateUrl: './all-loans.page.html',
  styleUrls: ['./all-loans.page.scss'],
})
export class AllLoansPage implements OnInit, ViewDidLeave {
  selectedSegment = 'active';
  destroy$ = new Subject<boolean>();
  allLoans: any[]
  refresherEvent: any;
  constructor(private modalController: ModalController, private router: Router, private service: MainService) { 
    console.log(this.router.url)}

  ngOnInit() {
    this.fetchAllLoans();
  }

  ionViewDidLeave(): void {
    this.destroy$.next();
    this.destroy$.complete()
    if (this.refresherEvent) {
      this.refresherEvent.target.complete()
    }
  }

  segmentChanged(event) {
    this.selectedSegment = event.target.value
  }

  fetchAllLoans() {
    this.service.getAllLoans().subscribe((data: any) => {
      this.allLoans = data.loans;
      // console.log(this.allLoans)
    })
  }

  refreshLoans(event) {
    this.refresherEvent = event;
    this.service.getAllLoans().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.allLoans = data.loans;
      // console.log(this.allLoans)
      event.target.complete();
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
}
