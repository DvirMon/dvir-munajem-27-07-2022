import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { ToastrService } from "ngx-toastr";

import { AutocompleteOption } from "../models/autocomplete-option";
import { AutocompleteResult } from "../models/autocomplete-result";
import { WeatherService } from "../services/weather.service";

import { Store } from "@ngrx/store";
import { AppSelectors } from "src/app/ngrx/app.types";
import { catchError, distinctUntilChanged, filter, map, merge, Observable, switchMap, take, throwError } from "rxjs";
import { WeatherResult } from "src/app/shared/components/weather-result/weather-result.component";

@Injectable({ providedIn: 'root' })
export class WeatherResolver implements Resolve<AutocompleteOption[]> {


  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private toastrService: ToastrService,
    private store: Store<any>
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AutocompleteOption[]> | Promise<AutocompleteOption[]> | AutocompleteOption[] {


    const searchResult$ = this.store.select(AppSelectors.searchResult).pipe(take(1))
    const selectedResult$ = this.store.select(AppSelectors.selectedResult)

    const server$ = selectedResult$
      .pipe(
        switchMap((res: Partial<WeatherResult>) => {
          return searchResult$
            .pipe(
              filter((items: AutocompleteResult[]) => !items.find((item: AutocompleteResult) => Number(item.Key) === res.id!)),
              switchMap((items: AutocompleteResult[]) => {
                return this.weatherService.getLocationOptions(res.location!).pipe(
                  catchError((error: HttpErrorResponse) => {
                    this.toastrService.error(error.message, 'An unexpected error ocurred');
                    this.router.navigate(['error'])
                    sessionStorage.setItem('errorMessage', 'An unexpected error ocurred. Please Try again later')
                    return throwError(() => error);
                  })
                )
              }))
        }))


    const local$ = selectedResult$
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


    return merge(server$, local$)

  }
}
