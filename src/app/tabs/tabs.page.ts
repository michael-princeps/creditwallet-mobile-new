import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  idleLogoutTimer: any;

  constructor(private modalController: ModalController,private authservice: AuthenticationService, private router: Router) { }

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
    }, 3600000);
  }


  logUserOut() {
    this.authservice.logUserOut().then(async () => {
      clearTimeout(this.idleLogoutTimer);
      await this.modalController.dismiss().then(() => this.router.navigate(['/unauthenticated'], { replaceUrl: true }), () => this.router.navigate(['/unauthenticated'], { replaceUrl: true }));
    })
  }
}
