import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CURRENT_WEATHER, FUTURE_WEATHER, LOCATIONS_AUTOCOMPLETE } from '../mock_data/data';

import { AutocompleteResult } from '../models/autocomplete-result';
import { CurrentWeatherResult } from '../models/current-weather-result';

import { Store } from '@ngrx/store';
import { AppActions, AppSelectors } from 'src/app/ngrx/app.types';
import { forkJoin, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { AutocompleteOption } from '../models/autocomplete-option';
import { WeatherResult } from 'src/app/shared/components/weather-result/weather-result.component';
import { FutureResultObject } from '../models/future-weather-result';

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


    const data = LOCATIONS_AUTOCOMPLETE.filter((item: AutocompleteResult) => item.LocalizedName.toLowerCase().includes(query.toLowerCase()));

    const action = AppActions.SetSearchResult({ data })
    this.store.dispatch(action)
    return this.store.select<AutocompleteResult[]>(AppSelectors.searchResult)
    const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey).set('q', query)
    // return this.http.get<AutocompleteResult[]>(this.baseUrl + 'locations/v1/cities/autocomplete', { params }).pipe(switchMap((result: AutocompleteResult[]) => {


    // }))
  }

  private getCurrentWeather(locationKey: number): Observable<CurrentWeatherResult[]> {
    const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey)
    // return this.http.get<CurrentWeatherResult[]>(this.baseUrl + 'currentconditions/v1/' + locationKey, { params })
    return of(CURRENT_WEATHER)
      .pipe(
        tap((data: CurrentWeatherResult[]) => {
          const action = AppActions.SetCurrentWeather({ data: data[0] })
          this.store.dispatch(action)
        }))
  }

  private getFutureWeather(locationKey: number): Observable<FutureResultObject> {
    const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey).append('metric', true)
    // return this.http.get<FutureResultObject>(this.baseUrl + 'forecasts/v1/daily/5day/' + locationKey, { params })
    return of(FUTURE_WEATHER)
      .pipe(
        tap((data: FutureResultObject) => {
          const action = AppActions.SetFutureWeather({ data })
          this.store.dispatch(action)
        })
      )
  }



  getLocationOptions(query: string): Observable<AutocompleteOption[]> {
    return this.getLocationAutocomplete(query).pipe(switchMap((res) => this.store.select(AppSelectors.autocompleteOptions)))
  }


  private _getSelectedWeatherResult(query: string): Observable<WeatherResult> {
    return this.getLocationAutocomplete(query).pipe(
      switchMap((res) => this.store.select(AppSelectors.autocompleteOptions)
        .pipe(
          map((options: AutocompleteOption[]) => options.find((option) => option.value.toLowerCase().includes(query.toLowerCase()))!))),
      map((option: AutocompleteOption) => {
        return {
          id: option.key,
          location: option.value,
        } as WeatherResult
      }),
      tap((data: WeatherResult) => {
        const action = AppActions.SetSelectedResult({ data })
        this.store.dispatch(action)
      })
    )

  }

  private _getWeatherData(key: number): Observable<Partial<WeatherResult>> {

    const locationKey: number = Number(key)

    const currentWeather$ = this.getCurrentWeather(locationKey)
    const futureWeather$ = this.getFutureWeather(locationKey)

    const result$ = forkJoin({ current: currentWeather$, future: futureWeather$ })

    return result$.pipe(switchMap((data) => {
      return this.store.select(AppSelectors.weatherResult).pipe(take(1))
    }))
  }

  getWeatherResult(option: AutocompleteOption): Observable<WeatherResult | null> {

    const { key, value } = option

    if (!!option) {

      return this._getWeatherData(key).pipe(
        map((data: Partial<WeatherResult>) => {
          return {
            id: key,
            location: value,
            ...data
          } as WeatherResult
        }),
        switchMap((data: WeatherResult) => {
          const action = AppActions.SetSelectedResult({ data })
          this.store.dispatch(action)
          return this.store.select(AppSelectors.weatherResult)

        }))

    } else {


      return this.store.select(AppSelectors.weatherResult)
    }
  }
}
