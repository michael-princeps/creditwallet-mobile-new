import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MediaCapture, MediaFile, CaptureImageOptions } from '@ionic-native/media-capture/ngx'
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';
import {File} from '@awesome-cordova-plugins/file/ngx'
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ToastService } from 'src/app/services/toast.service';
import { Capacitor } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.scss'],
})
export class ImageCaptureComponent implements OnInit {
  image: any;
  @Input() loadDetails: any;
  @Output() goNextEmitter = new EventEmitter();
  liveDetect: Blob;
  showErrorLiveness: boolean;
  imageSrc: any;
  constructor(private file: File, private toaster: ToastService, private sanitizer: DomSanitizer, private mediaCapture: MediaCapture, private loader: LoaderService, private service: MainService) { }

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

    this.imageSrc = 'data:image/jpeg;base64,' + capturedPhoto.base64String
    // console.log(this.convertToBlob(capturedPhoto))
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

  performLivenessTest() {
    const formData = new FormData();
    formData.append('Image',this.liveDetect);
    this.loader.simpleLoader();
      this.service.performLiveness(formData).subscribe((data: any) => {
        console.log(data);
        if (data.status == 1) {
          this.toaster.presentToast('success', 'Successful')
          this.goNext();
        } else {
          this.showErrorLiveness = true;
        }
        this.loader.dismissLoader();
      }, () => {
        this.showErrorLiveness = false;
        this.loader.dismissLoader()
      })
  }

  goNext() {
    this.goNextEmitter.emit({passport_file: this.liveDetect, page: 8})
  }
}
