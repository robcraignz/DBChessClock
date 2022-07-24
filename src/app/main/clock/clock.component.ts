import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {map, share} from "rxjs/operators";

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  date: Date = new Date();

  constructor() { }

  time = new Date();
  rxTime = new Date();
  intervalId = 0;
  subscription?: Subscription;

  ngOnInit(): void {
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

}
