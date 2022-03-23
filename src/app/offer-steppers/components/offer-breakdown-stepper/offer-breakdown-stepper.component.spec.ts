import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfferBreakdownStepperComponent } from './offer-breakdown-stepper.component';

describe('OfferBreakdownStepperComponent', () => {
  let component: OfferBreakdownStepperComponent;
  let fixture: ComponentFixture<OfferBreakdownStepperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferBreakdownStepperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfferBreakdownStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
