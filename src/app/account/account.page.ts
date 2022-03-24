import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from 'capacitor-email-composer'

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  showSupportModal = false;
  user: any;
  constructor(private callNumber: CallNumber, private authService: AuthenticationService, public actionSheetController: ActionSheetController, private router: Router) { }

  ngOnInit() {
    this.authService.userObject.subscribe((user) => this.user = user.user)
  }

  logUserOut() {
    this.authService.logUserOut().then(() => {
      this.router.navigate(['/unauthenticated'], {replaceUrl: true})
    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Support Help',
      cssClass: 'my-custom-class',
      buttons: [ 
        {
        text: 'Call 07085698828',
        // icon: 'call',
        handler: () => {
          this.openDialer()
        }
      }, {
        text: 'Send a mail',
        // icon: 'mail',
        data: 'Data value',
        handler: () => {
          this.openEmail()
        },
      },
      {
        text: 'Cancel',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }
    ]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    // console.log('onDidDismiss resolved with role and data', role, data);
  }

  openDialer() {
    this.callNumber.callNumber("07085698828", true)
      // .then(res => console.log('Call placed', res))
      // .catch(err => console.log('Error launching dialer', err));
  }

  async openEmail() {
    const isValid = await EmailComposer.hasAccount();
    let email: any = {
      to: 'support@creditwallet.ng',
      cc: 'support@creditwallet.ng',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      subject: 'I need assistance',
      body: 'Hi team, please I need help',
      isHtml: true
    }
    if (isValid) {
      EmailComposer.open(email)
    }
  }
}
