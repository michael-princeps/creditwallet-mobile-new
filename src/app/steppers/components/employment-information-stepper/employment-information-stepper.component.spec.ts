import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmploymentInformationStepperComponent } from './employment-information-stepper.component';

describe('EmploymentInformationStepperComponent', () => {
  let component: EmploymentInformationStepperComponent;
  let fixture: ComponentFixture<EmploymentInformationStepperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploymentInformationStepperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmploymentInformationStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
