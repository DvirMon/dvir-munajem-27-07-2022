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

  constructor(
    private http: HttpClient,
    private store: Store<any>
  ) {
  }


  private _getLocationAutocomplete(query: string): Observable<AutocompleteResult[]> {

    const data = LOCATIONS_AUTOCOMPLETE.filter((item: AutocompleteResult) => item.LocalizedName.toLowerCase().includes(query.toLowerCase()));
    const action = AppActions.SetSearchResult({ data });
    this.store.dispatch(action);
    return of(data);
    // const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey).set('q', query)
    // return this.http.get<AutocompleteResult[]>(this._baseUrl + 'locations/v1/cities/autocomplete', { params }).pipe(
    //   tap((data: AutocompleteResult[]) => {
    //     const action = AppActions.SetSearchResult({ data })
    //     this.store.dispatch(action)
    //   }))
  }

  getLocationOptions(query: string): Observable<AutocompleteOption[]> {
    return this._getLocationAutocomplete(query).pipe(
      switchMap((_) => this.store.select(AppSelectors.autocompleteOptions))
    )
  }


  private _getCurrentWeather(locationKey: number): Observable<CurrentWeatherResult> {

    const currentWeatherResults$ = this.store.select(AppSelectors.currentWeatherResult).pipe(take(1));

    const server$ = currentWeatherResults$.pipe(

      filter((data) => !data.hasOwnProperty(locationKey)),
      switchMap(() => {
        const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey)
        // return this.http.get<CurrentWeatherResult[]>(this._baseUrl + 'currentconditions/v1/' + locationKey, { params })
        return of(CURRENT_WEATHER)
          .pipe(
            map((data: CurrentWeatherResult[]) => {
              const action = AppActions.SetCurrentWeather({ data: data[0], id: locationKey })
              this.store.dispatch(action)
              return data[0]
            }))

      })
    )
    const local$ = currentWeatherResults$.pipe(
      filter((data) => data.hasOwnProperty(locationKey)),
      map((data) => data[locationKey]))

    return merge(server$, local$)


  }

  private _getFutureWeather(locationKey: number): Observable<FutureResultObject | null> {

    const futureWeatherResults$ = this.store.select(AppSelectors.futureWeatherResults).pipe(
      take(1))

    const metric$ = this.store.select(AppSelectors.isMetric)

    const server$ = combineLatest([futureWeatherResults$.pipe(
      filter((data) => !data.hasOwnProperty(locationKey))
    ), metric$])
      .pipe(switchMap(([data, metric]) => {

        // const params = new HttpParams().set('apikey', environment.accuWeatherAPIKey).append('metric', metric)
        // return this.http.get<FutureResultObject>(this._baseUrl + 'forecasts/v1/daily/5day/' + locationKey, { params })
          return of(FUTURE_WEATHER)
          .pipe(
            tap((data) => console.log('server', data)),

            tap((data: FutureResultObject) => {
              const action = AppActions.SetFutureWeather({ data, id: locationKey })
              this.store.dispatch(action)
            })
          )
      }))


    const local$ = futureWeatherResults$.pipe(
      filter((data) => data.hasOwnProperty(locationKey)),
      map((data) => data[locationKey]))

    return merge(server$, local$);
  }


  private _getWeatherData(key: number): Observable<void> {

    const locationKey: number = Number(key);

    const currentWeather$ = this._getCurrentWeather(locationKey);
    const futureWeather$ = this._getFutureWeather(locationKey);

    const result$ = combineLatest({ current: currentWeather$, future: futureWeather$ });

    return result$.pipe(map((_) => { }))
  }

  getWeatherResult(option: AutocompleteOption): Observable<WeatherResult | null> {

    const { key, value } = option


    if (!!option) {

      return this._getWeatherData(key).pipe(
        map((_) => {
          return {
            id: key,
            location: value.LocalizedName,
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
