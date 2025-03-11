import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppComponent,
    WeatherComponent,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: []
})
export class AppModule { }