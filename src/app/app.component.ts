import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch } from '@awesome-cordova-plugins/three-dee-touch/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';
import { FcmService } from './services/fcm.service';


let actions: ThreeDeeTouchQuickAction[] = [
  {
    type: 'start',
    title: 'Apply for Loan',
    iconType: 'Add'
  },
  {
    type: 'main/loans',
    title: 'Liquidate loan',
    iconType: 'Stop'
  },
];

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthenticationService, private fcmService: FcmService, private platform: Platform, private threeDeeTouch: ThreeDeeTouch, private router: Router, private zone: NgZone) {
    this.authService.checkIfUserExists();
    this.initializeApp();
    this.has3DTouch();
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const domain = 'apply.creditwallet.ng';
        const pathArray = event.url.split(domain);
        const appPath = pathArray.pop();
        if (appPath) {
          this.router.navigateByUrl(appPath, { replaceUrl: true });
        }
      });
    });
    App.addListener("appStateChange", (change) => {
      this.zone.run(() => {
        if (change.isActive && (window as any).shortcutItemType) {
          this.router.navigateByUrl((window as any).shortcutItemType);
          (window as any).shortcutItemType = null;
        }
      })
    });
  }

  has3DTouch() {
    this.threeDeeTouch.configureQuickActions(actions);
    this.platform.ready().then(() => {
      this.fcmService.initPush();
      this.threeDeeTouch.onHomeIconPressed().subscribe(
        (payload) => {
          // alert(payload.type)
          // console.log(payload)
          this.router.navigateByUrl(payload.type, { replaceUrl: true })
        }
      )
      setTimeout(async () => {
        await SplashScreen.hide();
      }, 250);
      // this.zone.run(() => {
      //   if ((window as any).shortcutItemType) {
      //     this.router.navigateByUrl((window as any).shortcutItemType);
      //     (window as any).shortcutItemType = null;
      //   }
      // })
    })
  }


}
