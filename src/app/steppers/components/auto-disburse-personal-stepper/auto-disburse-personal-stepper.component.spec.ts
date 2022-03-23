import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutoDisbursePersonalStepperComponent } from './auto-disburse-personal-stepper.component';

describe('AutoDisbursePersonalStepperComponent', () => {
  let component: AutoDisbursePersonalStepperComponent;
  let fixture: ComponentFixture<AutoDisbursePersonalStepperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoDisbursePersonalStepperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoDisbursePersonalStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
