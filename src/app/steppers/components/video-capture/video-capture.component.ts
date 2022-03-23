import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { MediaCapture, MediaFile, CaptureVideoOptions } from '@ionic-native/media-capture/ngx'
// import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';
import { DirectoryEntry, File as Filee } from '@awesome-cordova-plugins/file/ngx'
import { Platform, ViewDidLeave } from '@ionic/angular';
// import {FileOpener} from '@awesome-cordova-plugins/file-opener/ngx'
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx'
import { Capacitor } from '@capacitor/core';
import { MainService } from 'src/app/services/main.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const MEDIA_FOLDER_NAME = 'cw';

@Component({
  selector: 'video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.scss'],
})
export class VideoCaptureComponent implements OnInit, ViewDidLeave {
  @Input() loanDetails;
  @Output() goNextEmitter = new EventEmitter();
  mediaRecorder: MediaRecorder;
  isRecording: boolean;
  videoSrc: any;
  files: any;
  videoFile: Blob;
  destroy$ = new Subject<boolean>()
  videoPath: any;
  video: MediaFile;


  constructor(private permissions: AndroidPermissions, private domSanitizer: DomSanitizer, private file: Filee, private filepath: FilePath, private service: MainService, private loader: LoaderService, private mediaCapture: MediaCapture) {
    this.requestStoragePermission()
  }

  ngOnInit() { }

  ionViewDidLeave(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  requestStoragePermission() {
    return this.permissions.requestPermission(this.permissions.PERMISSION.READ_EXTERNAL_STORAGE).then((result) => {
      if (!result.hasPermission) {
        this.permissions.requestPermission(this.permissions.PERMISSION.READ_EXTERNAL_STORAGE)
      }
    }, () =>
      this.permissions.requestPermission(this.permissions.PERMISSION.READ_EXTERNAL_STORAGE))
  }

  // async playVideoURL() {
  //   await this.videoPlayer.play(this.video.fullPath, {
  //     volume: 1,
  //     scalingMode: 0
  //   }).then(() => {
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // }

  async recordVideo() {
    const options: CaptureVideoOptions = {
      limit: 1,
      quality: 0.2,
      duration: 30
    }
    this.isRecording = true;
    const videoResult =  await this.mediaCapture.captureVideo(options) as MediaFile[]
    const media = videoResult[0]
    this.video = media;
    const capacitorPath = await Capacitor.convertFileSrc(media.fullPath)
    console.log(this.video)
    this.videoPath = this.domSanitizer.bypassSecurityTrustUrl(capacitorPath);
  }

  takeNewRecording() {
    this.requestStoragePermission().then(() => this.recordVideo(), () => this.recordVideo())
  }

  // async showBase64(path) {
  //   const paths = Capacitor.convertFileSrc(path);
  //   // console.log(paths);
  //   console.log(this.file.dataDirectory)
  //   this.videoFile = await this.convertToBlob(paths)
  //   // console.log(this.videoFile)
  //   // return this.videoFile
  //   // console.log(this.file.dataDirectory)
  //   this.filepath.resolveNativePath(path).then((v) => {
  //     // Filesystem.readFile({
  //     // console.log(Capacitor.convertFileSrc(v))
  //     const val = Capacitor.convertFileSrc(v)
  //     this.convertToBlob(val).then(v => this.videoFile = v)
  //     // const pathf = path.substr(path.lastIndexOf('/') + 1);
  //     // console.log(pathf)
  //     // setTimeout(async() => {
  //     //   const contents = await Filesystem.readFile({
  //     //     path: v,
  //     //   });
  //     //   console.log(contents)
  //     // },);
  //   })
  // }
  private async convertToBlob(file) {
    const response = await fetch(file);
    const blob = await response.blob();
    return blob
  }

  async deleteFile() {
    const path = await this.filepath.resolveNativePath(this.video.fullPath)
    await Filesystem.deleteFile({
      path
    })
  }

  async uploadDocuments() {
    const videoFile = await this.convertToBlob(Capacitor.convertFileSrc(this.video.fullPath))
    // console.log(videoFile);
    var videoBlob = new Blob([videoFile],  { type: this.video.type });
    const formData = new FormData();
    formData.append('id', this.loanDetails.id);
    // formData.append('id', '108531');
    formData.append('video_file',videoBlob);
    formData.append('passport_file', this.loanDetails.passport_file);
    formData.append('name', this.video.name);
    this.loader.simpleLoader()
    this.service.submitAutoDisburseDocuments(formData).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      if (Capacitor.getPlatform() === 'android') {
        this.deleteFile().then(() => this.goNextEmitter.emit({page: 9}), () => this.goNextEmitter.emit({page: 9}))
      } else {
        this.goNextEmitter.emit({page: 9})
      }
      this.loader.dismissLoader();
    }, () => this.loader.dismissLoader())

  }

}