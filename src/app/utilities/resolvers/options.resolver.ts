import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { ToastrService } from "ngx-toastr";

import { AutocompleteOption } from "../models/autocomplete-option";
import { AutocompleteResult } from "../models/autocomplete-result";
import { WeatherResult } from "src/app/shared/components/weather-result/weather-result.component";
import { WeatherService } from "../services/weather.service";

import { Store } from "@ngrx/store";
import { AppActions, AppSelectors } from "src/app/ngrx/app.types";
import { catchError, distinctUntilChanged, filter, map, merge, Observable, switchMap, take, tap, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class WeatherResolver implements Resolve<AutocompleteOption[]> {


  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private toastrService: ToastrService,
    private store: Store<any>
  ) { }


  private _getDataFromSelectedResult(selectedResult$: Observable<Partial<WeatherResult>>, searchResult$: Observable<AutocompleteResult[]>): Observable<string> {
    return selectedResult$
      .pipe(
        switchMap((res: Partial<WeatherResult>) => {
          return searchResult$
            .pipe(
              filter((items: AutocompleteResult[]) => !items.find((item: AutocompleteResult) => Number(item.Key) === res.id!)),
              map(() => res.location!)
            )
        }))
  }

  private _getLocationOptions(location: string) {
    return this.weatherService.getLocationOptions(location).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastrService.error(error.message, 'An unexpected error ocurred');
        this.router.navigate(['error'])
        sessionStorage.setItem('errorMessage', 'An unexpected error ocurred. Please Try again later')
        return throwError(() => error);
      })
    )
  }

  private _getServerLocation() {
    const selectedResult$ = this.store.select(AppSelectors.selectedResult)
    const searchResult$ = this.store.select(AppSelectors.searchResult).pipe(take(1))
    const isGeolocation$ = this.store.select(AppSelectors.isGeo).pipe(take(1))

    const geolocation$ = isGeolocation$.pipe(
      filter((value) => value),
      switchMap(() =>
        this.weatherService.getGeolocationWeather()
      )
    )

    const serverLocation$ = isGeolocation$.pipe(
      filter((value) => !value),
      switchMap(() => this._getDataFromSelectedResult(selectedResult$, searchResult$))
    )

    return merge(geolocation$, serverLocation$)

  }

  private _getLocalLocation() {

    const selectedResult$ = this.store.select(AppSelectors.selectedResult);
    const searchResult$ = this.store.select(AppSelectors.searchResult).pipe(take(1));
    return selectedResult$
      .pipe(
        map((result) => result.id!),
        distinctUntilChanged(),
        switchMap((id: number) => {
          return searchResult$.pipe(
            filter((items: AutocompleteResult[]) => !!items.find((item: AutocompleteResult) => Number(item.Key) === id!)),
            switchMap(() =>
              this.store.select(AppSelectors.autocompleteOptions)
            )
          )
        }))
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AutocompleteOption[]> | Promise<AutocompleteOption[]> | AutocompleteOption[] {


    const server$ = this._getServerLocation()
      .pipe(
        tap(() => {
          const action = AppActions.UpdateGeolocation({ data: false })
          this.store.dispatch(action)
        }),
        switchMap((location) => this._getLocationOptions(location!))
      )

    const local$ = this._getLocalLocation()


    return merge(server$, local$)

  }
}
