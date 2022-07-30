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
      // filter((res) => res.length === 0),
      switchMap(() => {
        return this.weatherService.listenToSearchQuery().pipe(
          tap((query) => console.log('resolver server', query)),
          switchMap((query: string) => this.weatherService.getLocationOptions(query)),
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
      tap((query) => console.log('resolver local', query)),
      switchMap((_) => this.store.select(AppSelectors.autocompleteOptions))
    )

    return merge(server$)

  }
}
