import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { LOCATIONS_AUTOCOMPLETE } from '../mock_data/data';

import { AutocompleteResult } from '../models/autocomplete-result';
import { CurrentWeatherResult } from '../models/current-weather-result';

import { Store } from '@ngrx/store';
import { AppActions, AppSelectors } from 'src/app/ngrx/app.types';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { AutocompleteOption } from '../models/autocomplete-option';

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

  constructor(
    private http: HttpClient,
    private store: Store<any>
  ) {
  }


  private getLocationAutocomplete(query: string): Observable<AutocompleteResult[]> {

    const action = AppActions.SetSearchResult({ result: LOCATIONS_AUTOCOMPLETE })
    this.store.dispatch(action)

    return this.store.select<AutocompleteResult[]>(AppSelectors.searchResult)
    // const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey).set('q', query)
    // return this.http.get<AutocompleteResult[]>(this.baseUrl + 'locations/v1/cities/autocomplete', { params }).pipe(switchMap((result: AutocompleteResult[]) => {


    // }))
  }

  private getCurrentWeather(locationKey: number): Observable<CurrentWeatherResult[]> {
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

  private setWeatherData(data: { location: string, key: string }) {

    const { key, location } = data

    const locationKey: number = Number(key)

    const currentWeather$ = this.getCurrentWeather(locationKey)
    const futureWeather$ = this.getFutureWeather(locationKey)

    const result$ = forkJoin({ current: currentWeather$, future: futureWeather$ })

    return result$.pipe(map((result) => {

      return {
        location,
        ...result
      }

    }))
  }

  getLocationOptions(query: string): Observable<AutocompleteOption[]> {
    return this.getLocationAutocomplete(query).pipe(switchMap((res) => this.store.select(AppSelectors.autocompleteOptions)))
  }

  getWeather(query: string): Observable<string | null> {

    console.log(query)
    return this.getLocationAutocomplete(query).pipe(

      switchMap((result: AutocompleteResult[]) => {


        const item = this.getSingleLocation(query, result)


        if (!!item) {

          return of(item.Key)
          // .pipe(
          //   switchMap((key: string) =>
          //     this.setWeatherData({ key, location: item.LocalizedName })
          //   ))
        } else {

          return of('null')
        }
      }))
  }

}
