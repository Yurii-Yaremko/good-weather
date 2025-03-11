import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DecimalPipe
  ]
})
export class WeatherComponent {
  city: string = '';
  weatherData: any = null;
  error: string = '';
  loading: boolean = false;

  constructor(private weatherService: WeatherService) { }

  getWeather() {
    if (!this.city) return;
    
    this.loading = true;
    this.error = '';
    
    this.weatherService.getWeather(this.city)
      .subscribe({
        next: (data) => {
          this.weatherData = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'City not found or error';
          this.loading = false;
          this.weatherData = null;
        }
      });
  }

  getWeatherClass(): string {
    if (!this.weatherData) return '';
    
    const id = this.weatherData.weather[0].id;
    if (id >= 200 && id < 300) return 'thunderstorm';
    if (id >= 300 && id < 500) return 'drizzle';
    if (id >= 500 && id < 600) return 'rain';
    if (id >= 600 && id < 700) return 'snow';
    if (id >= 700 && id < 800) return 'atmosphere';
    if (id === 800) return 'clear';
    if (id > 800) return 'clouds';
    
    return '';
  }

  getWeatherIcon(): string {
    if (!this.weatherData) return 'fas fa-question';
    
    const id = this.weatherData.weather[0].id;
    
    if (id >= 200 && id < 300) return 'fas fa-bolt';
    if (id >= 300 && id < 400) return 'fas fa-cloud-rain';
    if (id >= 500 && id < 600) return 'fas fa-cloud-showers-heavy';
    if (id >= 600 && id < 700) return 'fas fa-snowflake';
    if (id >= 700 && id < 800) return 'fas fa-smog';
    if (id === 800) return 'fas fa-sun';
    if (id > 800) return 'fas fa-cloud';
    
    return 'fas fa-question';
  }
}
