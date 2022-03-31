import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loader: HTMLIonLoadingElement;
  isLoading: boolean;

  constructor(public loadingController: LoadingController) { }

  async simpleLoader() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      mode: 'ios',
      // spinner: 'crescent'
    });
    this.loader = loading;
    await loading.present().then(() => {
      if (!this.isLoading) {
        loading.dismiss()
      }
    });
  }


  async dismissLoader() {
    this.isLoading = false;
    await this.loadingController.getTop().then((hasLoading) => {
      if (hasLoading) {
        return this.loadingController.dismiss().then(() => { });
      }
    });
  }
}