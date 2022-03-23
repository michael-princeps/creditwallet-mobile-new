import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { ViewDidLeave } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-offer-upload-id-stepper',
  templateUrl: './offer-upload-id-stepper.component.html',
  styleUrls: ['./offer-upload-id-stepper.component.scss'],
})
export class OfferUploadIdStepperComponent implements OnInit, ViewDidLeave {
  @Output() goNextEmitter = new EventEmitter();
  @Input() loanOfferId: any;
  selectedFile: any;
  idCardUploadName: any;
  idCardUploadMessage: any;
  destroy$ = new Subject<boolean>()
  blobFile: Blob;
  constructor(private chooser: Chooser, private loader: LoaderService, private service: MainService) { }

  ngOnInit() { }

  ionViewDidLeave(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  async selectFile() {
    const file = await this.chooser.getFile('image/*, application/pdf');
    this.selectedFile = file;
    this.blobFile = await this.convertToBlob(file.dataURI);
    console.log(file);
  }

  private async convertToBlob(base64Url) {
    const response = await fetch(base64Url);
    const blob = await response.blob();
    return blob
  }

  uploadIdCard() {
    const formData = new FormData();
    formData.append('file', this.blobFile);
    formData.append('type', '0');
    formData.append('id', this.loanOfferId);
    formData.append('from', '0');
    this.loader.simpleLoader();
    this.service.uploadID(formData).subscribe((data: any) => {
      // this.isLoading = false;
      this.idCardUploadName = this.selectedFile?.name;
      this.idCardUploadMessage = data.message;
      // this.goNextEmitter.emit({...data, page: 6});
      this.acceptLoanOffer();
    }, () => this.loader.dismissLoader())
  }

  acceptLoanOffer() {
    const loan = {
      id: this.loanOfferId,
      idcard: this.idCardUploadMessage ? this.idCardUploadMessage : '',
    };
    this.service.acceptOffer(loan).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.loader.dismissLoader();
      this.goNextEmitter.emit(6);
    }, () => {
      this.loader.dismissLoader()
    })
  }
}
