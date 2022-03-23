import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-offer-selfie-stepper',
  templateUrl: './offer-selfie-stepper.component.html',
  styleUrls: ['./offer-selfie-stepper.component.scss'],
})
export class OfferSelfieStepperComponent implements OnInit {
  image: any;
  @Output() goNextEmitter = new EventEmitter();
  @Input() loanOfferID: any;
  liveDetect: Blob;
  showErrorLiveness: boolean;
  imageSrc: any;
  constructor(private toaster: ToastService, private loader: LoaderService, private service: MainService) { }

  ngOnInit() {
  }

  public async takePicture() {
    this.showErrorLiveness = false;
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 40,
      direction: CameraDirection.Front
    });
    console.log('image')
    console.log(capturedPhoto)

    this.imageSrc = 'data:image/jpeg;base64,' + capturedPhoto.base64String;
   this.convertToBlob(this.imageSrc).then(v =>  this.liveDetect = v)
  }

  // private async convertToBlob(photo: Photo) {
  //   const response = await fetch(photo.webPath!);
  //   const blob = await response.blob();
  //   return blob
  // }

  private async convertToBlob(base64Url) {
    const response = await fetch(base64Url);
    const blob = await response.blob();
    return blob
  }

  performVerification() {
    const formData = new FormData();
    this.loader.simpleLoader();
        formData.append('id', this.loanOfferID)
        formData.append('passport', this.imageSrc)
        this.service.uploadSelfie(formData).subscribe((data: any) => {
         this.loader.dismissLoader()
         this.toaster.presentToast('success', data.message)
          if (data.status === 'success') {
            this.goNextEmitter.emit({page: 4})
          }
        }, () =>  this.loader.dismissLoader())
  }

  // goNext() {
  //   this.goNextEmitter.emit({passport_file: this.liveDetect, page: 5})
  // }
}
