import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface WeatherCache {
  [key: string]: {
    data: any;
    timestamp: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private cache: WeatherCache = {};
  
  private oneMinute = 1 * 60 * 1000;
  private tenMinutes = 10 * this.oneMinute;
  private cacheTime = this.tenMinutes;

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    if (this.cache[city]) {
      const now = new Date().getTime();
      if (now - this.cache[city].timestamp < this.cacheTime) {
        return of(this.cache[city].data);
      }
    }

    return this.http.get(
      `${environment.weatherApiUrl}/weather?q=${city}&appid=${environment.weatherApiKey}&units=metric`
    ).pipe(
      map(data => {
        this.cache[city] = {
          data: data,
          timestamp: new Date().getTime()
        };
        return data;
      })
    );
  }
}
