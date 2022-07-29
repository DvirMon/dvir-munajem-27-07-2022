import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AutocompleteOption } from "../models/autocomplete-option";
import { WeatherService } from "../services/weather.service";
import { catchError, Observable, switchMap, tap, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: 'root' })
export class WeatherResolver implements Resolve<AutocompleteOption[]> {


  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private toastrService: ToastrService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AutocompleteOption[]> | Promise<AutocompleteOption[]> | AutocompleteOption[] {


    return this.weatherService.listenToSearchQuery().pipe(
      // tap((q) => console.log(q)),
      switchMap((query: string) => this.weatherService.getLocationOptions(query)),
      catchError((error: HttpErrorResponse) => {
        this.toastrService.error(error.message, 'An unexpected error ocurred');
        this.router.navigate(['error'])
        sessionStorage.setItem('errorMessage', 'An unexpected error ocurred. Please Try again later')
        return throwError(() => error);
      })

    )
  }
}
