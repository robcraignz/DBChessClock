import { Component, ViewChild } from '@angular/core';
import { TimerIntervalComponent } from '../timer-interval/timer-interval.component';
import { reset } from '../counter.actions';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timers-synchroniser',
  templateUrl: './timers-synchroniser.component.html',
  styleUrls: ['./timers-synchroniser.component.scss']
})
export class TimersSynchroniserComponent {
  @ViewChild('A') counterA?: TimerIntervalComponent;
  @ViewChild('B') counterB?: TimerIntervalComponent;
  // @ts-ignore
  first?;
  // @ts-ignore
  second?;
  // @ts-ignore
  paused?;
  // @ts-ignore
  running?;
  isStarted = false;
  // @ts-ignore
  isFinished: boolean ;
  isGloballyPaused = false;
  timeToCount: number = 0;



  constructor(private store: Store<{ count: number }>) {
    this.store
      .pipe(select('count'))
      .subscribe((curr) => (this.timeToCount = curr * 60 * 1000));
  }
  public handleGlobalPause() {
    if (this.isStarted) {
      this.isGloballyPaused = !this.isGloballyPaused;
      // @ts-ignore
      const runningComponent = this.running === 'A' ? this.counterA : this.counterB;
      // @ts-ignore
      runningComponent.toggle();
    }
  }

  handleReset() {
    this.isStarted = false;
    this.isFinished = false;
    this.isGloballyPaused = false;
    this.running = null;
    this.paused = null;
    this.first = null;
    this.second = null;
    this.store.dispatch(reset());
    // @ts-ignore
    this.counterA.reset();
    // @ts-ignore
    this.counterB.reset();
  }

  // @ts-ignore
  handleClick(event) {
    if (!this.first) {
      this.first = event.composedPath()[4].id;
      // @ts-ignore
      this.second = this.first === 'A' ? 'B' : 'A';
    }
    this.toggle();
  }

  handleFinish(event: any) {
    if (event) {
      this.isFinished = true;
    }
  }

  toggle() {
    // @ts-ignore
    const firstCounter = this.first === 'A' ? this.counterA : this.counterB;
    // @ts-ignore
    const secondCounter = this.first === 'A' ? this.counterB : this.counterA;

    if (!this.isStarted && !this.isGloballyPaused) {
      this.isStarted = true;
      this.running = this.first;
      this.paused = this.second;
      // @ts-ignore
      firstCounter.toggle();
    } else if (!this.isGloballyPaused) {
      // @ts-ignore
      this.running = this.running === 'A' ? 'B' : 'A';
      // @ts-ignore
      this.paused = this.running === 'B' ? 'A' : 'B';
      // @ts-ignore
      firstCounter.toggle();
      // @ts-ignore
      secondCounter.toggle();
    }
  }

}
