import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch } from '@awesome-cordova-plugins/three-dee-touch/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';
import { FcmService } from './services/fcm.service';
import { codePush, InstallMode } from 'capacitor-codepush';
import { environment } from 'src/environments/environment';
import {
  IRemotePackage,
  ILocalPackage,
} from 'capacitor-codepush/dist/esm/package';

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
      console.log(change)
      this.zone.run(() => {
        console.log(change.isActive)
        if (change.isActive && (window as any).shortcutItemType) {
          this.router.navigateByUrl((window as any).shortcutItemType);
          (window as any).shortcutItemType = null;
        } else if (change.isActive) {
          this.checkUpdate();
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
        await SplashScreen.hide({
          fadeOutDuration: 1000
        });
      }, 1500);
      // this.zone.run(() => {
      //   if ((window as any).shortcutItemType) {
      //     this.router.navigateByUrl((window as any).shortcutItemType);
      //     (window as any).shortcutItemType = null;
      //   }
      // })
    })
  }

  checkUpdate() {
    let deploymentKey;

    if (this.platform.is('ios')) {
      deploymentKey = environment.codePushIosKey;
      
    } else if (this.platform.is('android')) {
      deploymentKey = environment.codepushAndroidKey;
     
    }
    codePush.checkForUpdate(this.success, this.error, deploymentKey); 
  }

  async success(remotePackage: IRemotePackage) {
    if (!remotePackage) {
      console.log('App is Up to date');
      codePush.notifyApplicationReady();
    } else {
      if (!remotePackage.failedInstall) {
        // console.log(
        //   'A CodePush update is available. Package hash: ',
        //   remotePackage
        // );

        // DOWNLOAD UPDATE
        console.log('Downloading =========--=======>');
        const result: ILocalPackage = await remotePackage.download();
        if (result) {
          result.install({
            installMode: InstallMode.ON_NEXT_RESTART,
            minimumBackgroundDuration: 0,
            mandatoryInstallMode: InstallMode.ON_NEXT_RESTART,
          });
        }
        // console.log('Result of download', result);
      } else {
        console.log('The available update was attempted before and failed.');
      }
    }
  }

  onPackageDownloaded(localPackage: ILocalPackage) {
    console.log('Download succeeded.===========>', localPackage.description);
    localPackage
      .install({
        installMode: InstallMode.ON_NEXT_RESTART,
        minimumBackgroundDuration: 0,
        mandatoryInstallMode: InstallMode.ON_NEXT_RESTART,
      })
      .then(this.onInstallSuccess, this.error);
  }

  onInstallSuccess() {
    console.log('Installation succeeded.');

    setTimeout(async () => {
      codePush.restartApplication(); // restarts the application to patch the update
    }, 200);
  }

  error(error) {
    console.log('Error===>', error);
  }
}
