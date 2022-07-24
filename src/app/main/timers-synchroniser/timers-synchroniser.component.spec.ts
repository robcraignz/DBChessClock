import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimersSynchroniserComponent } from './timers-synchroniser.component';

describe('TimersSynchroniserComponent', () => {
  let component: TimersSynchroniserComponent;
  let fixture: ComponentFixture<TimersSynchroniserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimersSynchroniserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimersSynchroniserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
