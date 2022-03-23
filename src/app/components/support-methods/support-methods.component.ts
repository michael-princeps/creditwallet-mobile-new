import { Component, OnInit } from '@angular/core';
// import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx'
import { ModalController } from '@ionic/angular';
import { EmailComposer } from 'capacitor-email-composer'

// const email = EmailComposer;
@Component({
  selector: 'support-methods',
  templateUrl: './support-methods.component.html',
  styleUrls: ['./support-methods.component.scss'],
})
export class SupportMethodsComponent implements OnInit {

  constructor(private callNumber: CallNumber, private modalController: ModalController) { }

  ngOnInit() { }


  openDialer() {
    this.callNumber.callNumber("07085698828", true)
      .then(res => this.modalController.dismiss())
      .catch(err => console.log('Error launching dialer', err));
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
