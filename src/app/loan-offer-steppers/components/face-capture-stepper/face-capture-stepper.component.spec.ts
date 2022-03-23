import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaceCaptureStepperComponent } from './face-capture-stepper.component';

describe('FaceCaptureStepperComponent', () => {
  let component: FaceCaptureStepperComponent;
  let fixture: ComponentFixture<FaceCaptureStepperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceCaptureStepperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaceCaptureStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
