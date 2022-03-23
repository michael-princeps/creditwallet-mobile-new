import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  public async presentToast(type, message) {
    try {
      this.toastController.dismiss().then(() => {
      }).catch(() => {
      }).finally(() => {

      });
    } catch(e) {}
    
    this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: type,
      // mode: 'ios',
      buttons: [
        {
          side: 'end',
          // icon: 'close-circle',
          text: 'Okay',
          handler: () => {
            // toast.dismiss()
          }
        },
      ]
    }).then((toast) => toast.present());
    
  }
}
