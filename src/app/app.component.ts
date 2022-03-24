import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { App, URLOpenListenerEvent } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthenticationService, private router: Router, private zone: NgZone) {
    this.authService.checkIfUserExists();
    this.initializeApp()
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const domain = 'apply.creditwallet.ng';
 
        const pathArray = event.url.split(domain);
        // The pathArray is now like ['https://devdactic.com', '/details/42']
 
        // Get the last element with pop()
        const appPath = pathArray.pop();
        if (appPath) {
          this.router.navigateByUrl(appPath, {replaceUrl: true});
        }
      });
    });
  }
}
