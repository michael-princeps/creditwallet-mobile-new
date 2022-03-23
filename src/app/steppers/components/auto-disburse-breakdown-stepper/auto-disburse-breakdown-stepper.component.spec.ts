import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutoDisburseBreakdownStepperComponent } from './auto-disburse-breakdown-stepper.component';

describe('AutoDisburseBreakdownStepperComponent', () => {
  let component: AutoDisburseBreakdownStepperComponent;
  let fixture: ComponentFixture<AutoDisburseBreakdownStepperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoDisburseBreakdownStepperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoDisburseBreakdownStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
