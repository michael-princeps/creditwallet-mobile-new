import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfferUploadIdStepperComponent } from './offer-upload-id-stepper.component';

describe('OfferUploadIdStepperComponent', () => {
  let component: OfferUploadIdStepperComponent;
  let fixture: ComponentFixture<OfferUploadIdStepperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferUploadIdStepperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfferUploadIdStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
