import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {increment, decrement, reset, custom} from '../counter.actions';

@Component({
  selector: 'app-timers-settings',
  templateUrl: './timers-settings.component.html',
  styleUrls: [ './timers-settings.component.scss' ]
})
export class TimersSettingsComponent implements OnInit {
  count$: Observable<number>;
  battleSize: string = 'Strike Force - 3.0 hours';


  constructor(private store: Store<{ count: number }>, private router: Router) {
    this.count$ = store.pipe(select('count'));
  }

  ngOnInit(): void {
    this.setFromLocalStorage();
    this.setBattleTime();
  }

  saveToLocalStorage(value: number): void {
    if ( value ) {
      localStorage.setItem('chess-clock', `${value}`);
    }
  }

  setFromLocalStorage(): void {
    const value = Number(localStorage.getItem('chess-clock'));
    if ( value ) {
      this.store.dispatch(custom({ value }));
    }
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    if ( this.getCurrentValue() > 1 ) {
      this.store.dispatch(decrement());
    }
  }

  reset() {
    this.store.dispatch(reset());
  }

  start() {
    this.saveToLocalStorage(this.getCurrentValue());
  }

  getCurrentValue(): number {
    let currentValue: number;
    this.count$.subscribe((val) => (currentValue = val));
    // @ts-ignore
    return currentValue;
  }

  setBattleTime(): void {
    let playerTime: number = 85;
    if (this.battleSize === 'Strike Force - 3.0 hours') {
      playerTime = 85
    }
    if (this.battleSize === 'Strike Force - 2.5 hours') {
      playerTime = 70
    }
    if (this.battleSize === 'Incursion - 1.5 hours') {
      playerTime = 40
    }
    this.saveToLocalStorage(playerTime);
    this.setFromLocalStorage();
    this.getCurrentValue();
  }
}
