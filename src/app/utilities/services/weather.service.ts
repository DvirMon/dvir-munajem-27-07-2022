import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AutocompleteResult } from '../../models/weather'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl: string = environment.weatherEndpoint;

  constructor(
    private http: HttpClient
  ) { }


  private locationAutocomplete(query: string): Observable<AutocompleteResult> {

    const params = new HttpParams()
      .set('apikey', environment.accuWeatherAPIKey)
      .set('q', query);


    return this.http.get<AutocompleteResult>(this.baseUrl + 'locations/v1/cities/autocomplet', { params })

  }
}
