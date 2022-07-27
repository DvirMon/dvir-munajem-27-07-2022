import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutocompleteResult } from 'src/app/models/weather';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl: string = environment.weatherEndpoint;


  constructor(
    private http: HttpClient
  ) {

  }


  locationAutocomplete(query: string): Observable<AutocompleteResult[]> {


    const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey).set('q', query)

    return this.http.get<AutocompleteResult[]>(this.baseUrl + 'locations/v1/cities/autocomplete', { params })

  }



  private getCurrentWeather() {


  }

}
