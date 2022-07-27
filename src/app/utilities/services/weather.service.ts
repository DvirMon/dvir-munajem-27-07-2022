import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { AutocompleteResult } from 'src/app/models/autocomplete-result';
import { CurrentWeatherResult } from 'src/app/models/current-weather-result';
import { environment } from 'src/environments/environment';


export interface Weather {

  id: number,
  location: string,
  currentWeather: string
  forecasts: any[]

}


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl: string = environment.weatherEndpoint;

  private params: HttpParams = new HttpParams()


  constructor(
    private http: HttpClient
  ) {
    this.params.append('apikey', environment.accuWeatherAPIKey)
  }


  private getLocationAutocomplete(query: string): Observable<AutocompleteResult[]> {
    const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey).set('q', query)
    return this.http.get<AutocompleteResult[]>(this.baseUrl + 'locations/v1/cities/autocomplete', { params })
  }

  private getCurrentWeather(locationKey: number) : Observable<CurrentWeatherResult[]> {
    const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey)
    return this.http.get<CurrentWeatherResult[]>(this.baseUrl + 'currentconditions/v1/' + locationKey, { params })
  }

  private getFutureWeather(locationKey: number) {
    const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey)
    return this.http.get<AutocompleteResult[]>(this.baseUrl + 'forecasts/v1/daily/5day/' + locationKey, { params })
  }


  private getSingleLocation(query: string, result: AutocompleteResult[]): AutocompleteResult | undefined {

    if (result.length > 1) {
      return result.find((item: AutocompleteResult) => item.LocalizedName.toLowerCase().includes(query.toLowerCase()))
    } else {

      return result[0]
    }
  }

  // private mapCurrentWeatherToText(result : CurrentWeatherResult[]) {

  //   if(result.length) {

  //     const item = res
  //   }

  //   else return null

  // }

  getWeather(query: string) {
    return this.getLocationAutocomplete(query).pipe(switchMap((result: AutocompleteResult[]) => {

      const item = this.getSingleLocation(query, result)

      if (!!item) {

        const locationKey: number = Number(item.Key)

        const currentWeather$ = this.getCurrentWeather(locationKey)
        const futureWeather$ = this.getFutureWeather(locationKey)

        const result$ = forkJoin({ current: currentWeather$, future: futureWeather$ })

        return result$

      }


      return of(null)
    }))
  }

}
