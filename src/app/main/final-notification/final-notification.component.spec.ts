import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalNotificationComponent } from './final-notification.component';

describe('FinalNotificationComponent', () => {
  let component: FinalNotificationComponent;
  let fixture: ComponentFixture<FinalNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
