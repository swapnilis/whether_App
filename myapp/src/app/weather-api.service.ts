import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  //url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=173bd68c3291f57ca747d00e001a8d91";

  //second_url = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=1&appid=173bd68c3291f57ca747d00e001a8d91";

  constructor(private user: HttpClient) {}

  getLatLong(cityName: any) {
    return this.user.get(
      'http://api.openweathermap.org/geo/1.0/direct?q=' +
        cityName +
        '&limit=1&appid=173bd68c3291f57ca747d00e001a8d91'
    );
  }

  getWeatherData(lat: any, long: any) {
    return this.user.get(
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
        lat +
        '&lon=' +
        long +
        '&appid=173bd68c3291f57ca747d00e001a8d91'
    );
  }
}
