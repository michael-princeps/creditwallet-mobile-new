import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfferSelfieStepperComponent } from './offer-selfie-stepper.component';

describe('OfferSelfieStepperComponent', () => {
  let component: OfferSelfieStepperComponent;
  let fixture: ComponentFixture<OfferSelfieStepperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferSelfieStepperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfferSelfieStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
