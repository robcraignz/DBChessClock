import {
  Component,
  OnDestroy,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from '@angular/core';
import { Colors } from '../Colors';

@Component({
  selector: 'app-timer-interval',
  templateUrl: './timer-interval.component.html',
  styleUrls: ['./timer-interval.component.scss']
})
export class TimerIntervalComponent implements OnChanges, OnDestroy {
@Input() timeToCount: number = 0;
@Output() isFinished: EventEmitter<boolean> = new EventEmitter();
  isStarted = false;
  isRunning = false;
  isPaused = true;
  initialTime: number = 0;
  finishTime: number = 0;
  actualTime: number = 0;
  timeLeft: number = 0;
  color: string = '';
  percentage: number = 0;
  interval: ReturnType<typeof setTimeout> | undefined;

  ngOnChanges(changes: SimpleChanges) {
    this.setInitialTimeLeft(changes);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

private setInitialTimeLeft(changes: SimpleChanges) {
  // @ts-ignore
    if (changes?.timeToCount?.firstChange) {
      this.timeLeft = this.timeToCount;
    }
  }

public toggle() {
    if (!this.isStarted) {
      this.start();
    } else if (this.isRunning) {
      this.pause();
    } else if (this.isPaused) {
      this.unPause();
    }
  }

private start() {
    if (!this.isStarted) {
      this.isRunning = true;
      this.isStarted = true;
      this.initialTime = Date.now();
      this.finishTime = this.initialTime + this.timeToCount;
      this.timeLeft = this.finishTime - this.initialTime;
      this.count();
    }
  }

public reset() {
    this.isStarted = false;
    this.isRunning = false;
    this.isPaused = false;
    this.percentage = 0;
    this.timeLeft = this.timeToCount;
    this.finishTime = 0;
    this.setColor();
    clearInterval(this.interval);
  }

private unPause() {
    if (this.isPaused) {
      this.isPaused = false;
      this.isRunning = true;
      this.initialTime = Date.now();
      this.finishTime = this.initialTime + this.timeLeft;
      this.count();
    }
  }

private pause() {
    if (this.isRunning) {
      this.isRunning = false;
      this.isPaused = true;
      this.setColor();
      clearInterval(this.interval);
    }
  }

private setColor(): void {
    if (this.isRunning) {
    this.color =
      this.percentage > 95.29
        ? Colors.Green
        : this.percentage > 80
          ? Colors.YellowGreen
          : this.percentage > 56.47
            ? Colors.Yellow
            : this.percentage > 32.94
              ? Colors.YellowOrange
              : this.percentage > 16.47
                ? Colors.Orange
                : this.percentage > 5.88
                  ? Colors.RedOrange
                  : Colors.Red;
  } else if (this.isPaused) {
    this.color = Colors.Pause;
  } else {
    this.color = Colors.initialColor;
  }
}

private count() {
    this.interval = setInterval(() => {
      this.actualTime = Date.now();
      if (this.timeLeft > 0) {
        this.timeLeft = this.finishTime - this.actualTime;
        this.percentage = Number(
          ((this.timeLeft / this.timeToCount) * 100).toFixed(3)
        );
        this.setColor();
      } else {
        this.isFinished.emit(true);
        clearInterval(this.interval);
      }
    }, 10);
  }

}
