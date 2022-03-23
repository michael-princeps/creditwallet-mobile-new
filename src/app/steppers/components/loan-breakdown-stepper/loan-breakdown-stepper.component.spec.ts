import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanBreakdownStepperComponent } from './loan-breakdown-stepper.component';

describe('LoanBreakdownStepperComponent', () => {
  let component: LoanBreakdownStepperComponent;
  let fixture: ComponentFixture<LoanBreakdownStepperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanBreakdownStepperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanBreakdownStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
