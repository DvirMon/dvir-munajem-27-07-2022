import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AutocompleteOption } from "../models/autocomplete-option";
import { WeatherService } from "../services/weather.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { catchError, filter, map, merge, Observable, switchMap, tap, throwError } from "rxjs";
import { Store } from "@ngrx/store";
import { AppSelectors } from "src/app/ngrx/app.types";
import { AutocompleteResult } from "../models/autocomplete-result";

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


    const searchResult$ = this.store.select(AppSelectors.searchResult)


    const server$ = searchResult$.pipe(
      filter((res) => res.length === 0),
      tap(() => console.log('filter length')),
      switchMap(() => {
        return this.weatherService.listenToSearchQuery().pipe(
          tap(() => console.log('search query')),
          switchMap((query: string) => this.weatherService.getLocationOptions(query)
            .pipe(tap(() => console.log('location http')),
          )),
          catchError((error: HttpErrorResponse) => {
            this.toastrService.error(error.message, 'An unexpected error ocurred');
            this.router.navigate(['error'])
            sessionStorage.setItem('errorMessage', 'An unexpected error ocurred. Please Try again later')
            return throwError(() => error);
          }))
      })
    )
    const local$ = searchResult$.pipe(
      filter((res) => res.length !== 0),
      map((res) => res.map((item: AutocompleteResult) => {
        return {
          value: item.LocalizedName,
          key: Number(item.Key),
        } as AutocompleteOption
      }))
    )

    return merge(server$, local$)

  }
}
