import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnauthenticatedPagePage } from './unauthenticated-page.page';

describe('UnauthenticatedPagePage', () => {
  let component: UnauthenticatedPagePage;
  let fixture: ComponentFixture<UnauthenticatedPagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthenticatedPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnauthenticatedPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
