import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import SwiperCore from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { AuthLandingPage } from '../auth-landing/auth-landing.page';
import { ModalBaseComponent } from '../components/modal-base/modal-base.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  @ViewChild(SwiperComponent) swiper: SwiperComponent;
  activeIndex = 0;
  breakPoint = 0.65
  constructor(private modalController: ModalController, private chref: ChangeDetectorRef,) { }

  ngOnInit() {
  }

  changeActiveClass(swiper) {
    // console.log(swiper)
    this.activeIndex = swiper.swiperRef.activeIndex;
    this.chref.detectChanges();
    // console.log(this.activeIndex)
  }

  goToSlide(index: number) {
    this.swiper.swiperRef.slideTo(index)
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalBaseComponent,
      backdropDismiss: false,
      initialBreakpoint: 0.65,
      componentProps: {
        rootPage: AuthLandingPage
      },
      handle: false,
      breakpoints: [0, 0.65]
    });
    return await modal.present()
  }
}
