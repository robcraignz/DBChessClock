import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainComponent} from "./main/main.component";
import {TimersSettingsComponent} from './main/timers-settings/timers-settings.component';
import {TimersSynchroniserComponent} from './main/timers-synchroniser/timers-synchroniser.component';

const routes: Routes = [
  { path: 'settings', component: TimersSettingsComponent },
  { path: 'counter', component: TimersSynchroniserComponent },
  { path: 'main', component: MainComponent },
  // { path: '', redirectTo: '/settings', pathMatch: 'full' },
  { path: '', redirectTo: '/counter', pathMatch: 'full' },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
