import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CURRENT_WEATHER, FUTURE_WEATHER, LOCATIONS_AUTOCOMPLETE } from '../mock_data/data';

import { AutocompleteResult } from '../models/autocomplete-result';
import { CurrentWeatherResult } from '../models/current-weather-result';

import { Store } from '@ngrx/store';
import { AppActions, AppSelectors } from 'src/app/ngrx/app.types';
import { BehaviorSubject, combineLatest, filter, forkJoin, map, merge, Observable, of, skip, switchMap, take, tap } from 'rxjs';
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

  private _baseUrl: string = environment.weatherEndpoint;
  private _defaultQuery: string = 'tel aviv'
  private _searchQuerySource$: BehaviorSubject<string> = new BehaviorSubject<string>(this._defaultQuery)

  constructor(
    private http: HttpClient,
    private store: Store<any>
  ) {
  }

  listenToSearchQuery() {
    return this._searchQuerySource$.asObservable()
  }

  emitSearchQuery(value: string) {
    this._searchQuerySource$.next(value)
  }


  private getLocationAutocomplete(query: string): Observable<AutocompleteResult[]> {

    // const data = LOCATIONS_AUTOCOMPLETE.filter((item: AutocompleteResult) => item.LocalizedName.toLowerCase().includes(query.toLowerCase()));
    // const action = AppActions.SetSearchResult({ data })
    // this.store.dispatch(action)
    // return of(data)
    const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey).set('q', query)
    return this.http.get<AutocompleteResult[]>(this._baseUrl + 'locations/v1/cities/autocomplete')
  }

  private getCurrentWeather(locationKey: number): Observable<CurrentWeatherResult> {

    const currentWeatherResult$ = this.store.select(AppSelectors.currentWeatherResult).pipe(take(1))

    const server$ = currentWeatherResult$.pipe(

      filter((res) => Object.entries(res).length === 0),
      switchMap(() => {
        const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey)
        return this.http.get<CurrentWeatherResult[]>(this._baseUrl + 'currentconditions/v1/' + locationKey, { params })
        // return of(CURRENT_WEATHER)
          .pipe(
            map((data: CurrentWeatherResult[]) => {
              const action = AppActions.SetCurrentWeather({ data: data[0] })
              this.store.dispatch(action)
              return data[0]
            }))

      })
    )
    const local$ = currentWeatherResult$.pipe(filter((res) => Object.entries(res).length !== 0))

    return merge(server$, local$)


  }

  private getFutureWeather(locationKey: number): Observable<FutureResultObject | null> {

    const futureWeatherResult$ = this.store.select(AppSelectors.futureWeatherResult).pipe(take(1));

    const server$ = futureWeatherResult$.pipe(
      filter((res) => !res),
      switchMap(() => {
        // console.log('future server')
        const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey).append('metric', true)
        return this.http.get<FutureResultObject>(this._baseUrl + 'forecasts/v1/daily/5day/' + locationKey, { params })
        // return of(FUTURE_WEATHER)
          .pipe(
            tap((data: FutureResultObject) => {
              const action = AppActions.SetFutureWeather({ data })
              this.store.dispatch(action)
            })
          )
      }))

    const local$ = futureWeatherResult$.pipe(filter((res) => res !== null))

    return merge(server$, local$);


  }



  getLocationOptions(query: string): Observable<AutocompleteOption[]> {
    return this.getLocationAutocomplete(query).pipe(switchMap((_) => this.store.select(AppSelectors.autocompleteOptions)))
  }


  private _getWeatherData(key: number): Observable<void> {

    const locationKey: number = Number(key);

    const currentWeather$ = this.getCurrentWeather(locationKey);
    const futureWeather$ = this.getFutureWeather(locationKey);

    const result$ = forkJoin({ current: currentWeather$, future: futureWeather$ });

    return result$.pipe(map((_) => {
}))
  }

  getWeatherResult(option: AutocompleteOption): Observable<WeatherResult | null> {

    const { key, value } = option


    if (!!option) {

      return this._getWeatherData(key).pipe(
        map((_) => {
          return {
            id: key,
            location: value,
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
