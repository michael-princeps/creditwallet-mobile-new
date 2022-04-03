import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  idleLogoutTimer: any;
  destroy$ = new Subject<boolean>();
  showTabs = true;
  constructor(private modalController: ModalController, private authservice: AuthenticationService, private router: Router) {
    // this.router.events.pipe(filter(e => e instanceof NavigationEnd), takeUntil(this.destroy$)).subscribe((event) => {
    //   if (event['url'].indexOf('notifications') !== -1) {
    //     this.showTabs = false;
    //   } else {
    //     this.showTabs = true;
    //   }
    // })
   }

  @HostListener('touchstart')
  onTouchStart() {
    this.restartIdleLogoutTimer();
  }

  ngOnInit(): void {
    this.restartIdleLogoutTimer();
  }

  restartIdleLogoutTimer() {
    clearTimeout(this.idleLogoutTimer);
    this.idleLogoutTimer = setTimeout(() => {
      this.logUserOut();
    }, 36000000);
  }


  logUserOut() {
    this.authservice.logUserOut().then(async () => {
      clearTimeout(this.idleLogoutTimer);
      await this.modalController.dismiss().then(() => this.router.navigate(['/unauthenticated'], { replaceUrl: true }), () => this.router.navigate(['/unauthenticated'], { replaceUrl: true }));
    })
  }
}
