import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-timer-display',
  templateUrl: './timer-display.component.html',
  styleUrls: ['./timer-display.component.scss']
})
export class TimerDisplayComponent implements OnChanges {
  hours: string = '';
  milliseconds: string = '';
  seconds: string = '';
  minutes: string = '';
  initialTime: string = '';
  @Input() timeToCountInMs: number = 0;
  @Input() totalTimeInMs: number = 0;
  @Input() color: string = '';

  ngOnInit () {
    this.formatInitialTime(this.timeToCountInMs);
  }

  ngOnChanges() {
    this.formatTime(this.totalTimeInMs);
  }

  normalizeTime(timeInMs: number) {
    const hours: number = Math.floor(timeInMs / 3600000);
    const minutes: number = Math.floor(timeInMs / 60000) % 60;
    const seconds: number = Math.floor(timeInMs / 1000) % 60;
    const totalSeconds: number = (timeInMs / 1000) % 60;
    const milliseconds: number = Math.round((totalSeconds - seconds) * 1000);
    const normaliseTimeString: {  hours: number, minutes: number, seconds: number, milliseconds: number } = { hours, minutes, seconds, milliseconds };
    return normaliseTimeString;
  }

  addZero(normaliseTimeString: {  hours: number, minutes: number, seconds: number, milliseconds: number }) {
    const addZeroHours: string = String(normaliseTimeString.hours);
    const addZeroMinutes: string = String(normaliseTimeString.minutes).padStart(2, '0');
    const addZeroSeconds: string = String(normaliseTimeString.seconds).padStart(2, '0');
    const addZeroMilliseconds: string = String(normaliseTimeString.milliseconds).padStart(3, '0');
    return {
      addZeroHours,
      addZeroMinutes,
      addZeroSeconds,
      addZeroMilliseconds
    };
  }

  formatInitialTime(timeinMS: number) {
    const normalizedTime =
      this.timeToCountInMs > 0
        ? this.normalizeTime(this.timeToCountInMs)
        : this.normalizeTime(0);
    const { addZeroHours, addZeroMinutes, addZeroSeconds, addZeroMilliseconds } = this.addZero(normalizedTime);
    this.initialTime = addZeroHours + ':' + addZeroMinutes + ':' + addZeroSeconds;
  }

  formatTime(timeInMs: number) {
    const normalizedTime =
      timeInMs > 0
        ? this.normalizeTime(this.totalTimeInMs)
        : this.normalizeTime(0);
    const { addZeroHours, addZeroMinutes, addZeroSeconds, addZeroMilliseconds } = this.addZero(normalizedTime);
    this.hours = addZeroHours;
    this.minutes = addZeroMinutes;
    this.seconds = addZeroSeconds;
    this.milliseconds = addZeroMilliseconds;
  }

}
