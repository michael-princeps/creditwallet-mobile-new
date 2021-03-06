import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { addToStorage, FCM_TOKEN } from './storage';
// import {
//   LocalNotificationActionPerformed,
//   LocalNotifications
// } from '@capacitor/local-notifications';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private router: Router, private localNotification: LocalNotifications) { }

  initPush() {
    if (Capacitor.getPlatform() != 'web') {
      this.registerPush();
    }
  }

  private registerPush() {

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      // alert('Push registration success, token: ' + token.value);
      console.log(token.value)
      addToStorage(FCM_TOKEN, token.value)
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      // alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // alert('Push received: ' + JSON.stringify(notification));
        this.doLocalNotif(notification)

        // this.localNotification addListener('localNotificationActionPerformed', (event: LocalNotificationActionPerformed) => {
        //   this.router.navigateByUrl('main/notifications');
        // })
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        const data = notification.notification.data;
        // alert('Push action performed: ' + JSON.stringify(notification));
        // this.router.navigateByUrl(`/home/${data.detailsId}`);
        this.router.navigateByUrl(`main/notifications`);
      },
    );
  }

  doLocalNotif(notification) {
    this.localNotification.schedule( {
      title: notification.title,
      text: notification.body,
      id: Date.now(),
      foreground: true,
      launch: true,
      icon: 'res://ic_activity_icon.png'
    });
  }
}
