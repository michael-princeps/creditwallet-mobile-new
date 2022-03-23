import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  idleLogoutTimer: any;

  constructor(private authservice: AuthenticationService, private router: Router) { }

  @HostListener('touchstart')
  onTouchStart() {
    this.restartIdleLogoutTimer();
  }
  restartIdleLogoutTimer() {
    clearTimeout(this.idleLogoutTimer);
    this.idleLogoutTimer = setTimeout(() => {
      this.logUserOut();
    }, 3600000);
  }

  logUserOut() {
    this.authservice.logUserOut().then(() => {
      clearTimeout(this.idleLogoutTimer);
      this.router.navigate(['/unauthenticated'], { replaceUrl: true })
    })
  }
}
