import { Component } from '@angular/core';
import { WeatherComponent } from './weather/weather.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    WeatherComponent,
    RouterModule,
    CommonModule
  ]
})
export class AppComponent {
  title = 'good-weather';
}
