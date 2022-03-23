import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanAutoDisburseApplicationPage } from './loan-auto-disburse-application.page';

describe('LoanAutoDisburseApplicationPage', () => {
  let component: LoanAutoDisburseApplicationPage;
  let fixture: ComponentFixture<LoanAutoDisburseApplicationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAutoDisburseApplicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanAutoDisburseApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
