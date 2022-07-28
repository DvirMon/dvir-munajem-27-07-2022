import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { LOCATIONS_AUTOCOMPLETE } from '../mock_data/data';

import { AutocompleteResult } from '../models/autocomplete-result';
import { CurrentWeatherResult } from '../models/current-weather-result';

import { Store } from '@ngrx/store';
import { AppActions, AppSelectors } from 'src/app/ngrx/app.types';
import { forkJoin, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { AutocompleteOption } from '../models/autocomplete-option';
import { WeatherResult } from 'src/app/shared/components/weather-result/weather-result.component';

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

    const action = AppActions.SetSearchResult({ data: LOCATIONS_AUTOCOMPLETE })
    this.store.dispatch(action)

    return this.store.select<AutocompleteResult[]>(AppSelectors.searchResult)
    // const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey).set('q', query)
    // return this.http.get<AutocompleteResult[]>(this.baseUrl + 'locations/v1/cities/autocomplete', { params }).pipe(switchMap((result: AutocompleteResult[]) => {


    // }))
  }

  private getCurrentWeather(locationKey: number): Observable<CurrentWeatherResult[]> {
    const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey)
    return this.http.get<CurrentWeatherResult[]>(this.baseUrl + 'currentconditions/v1/' + locationKey, { params })
      .pipe(
        tap((data: CurrentWeatherResult[]) => {
          const action = AppActions.SetCurrentWeather({ data: data[0] })
          this.store.dispatch(action)
        }))
  }

  private getFutureWeather(locationKey: number) {
    const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey)
    return this.http.get<CurrentWeatherResult[]>(this.baseUrl + 'forecasts/v1/daily/5day/' + locationKey, { params })
      .pipe(
        tap((data: CurrentWeatherResult[]) => {
          const action = AppActions.SetCurrentWeather({ data: data[0] })
          this.store.dispatch(action)
        })
      )
  }



  // private mapCurrentWeatherToText(result : CurrentWeatherResult[]) {

  //   if(result.length) {

  //     const item = res
  //   }

  //   else return null

  // }



  getLocationOptions(query: string): Observable<AutocompleteOption[]> {
    return this.getLocationAutocomplete(query).pipe(switchMap((res) => this.store.select(AppSelectors.autocompleteOptions)))
  }

  private getLocalForecast() {

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

    // const currentWeather$ = this.getCurrentWeather(locationKey)
    // const futureWeather$ = this.getFutureWeather(locationKey)

    const result$ = forkJoin({ current: of(true), future: of(false) })

    return result$.pipe(switchMap((data) => {
      return this.store.select(AppSelectors.weatherResult).pipe(take(1))
    }))
  }

  getWeatherResult(query: string): Observable<WeatherResult | null> {

    return this._getSelectedWeatherResult(query).pipe(

      switchMap((item: WeatherResult) => {

        if (!!item) {


          return this._getWeatherData(item.id).pipe(
            map((data: Partial<WeatherResult>) => {
              return {
                ...item,
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
      }))
  }

}
