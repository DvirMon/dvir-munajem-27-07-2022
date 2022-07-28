import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AutocompleteOption } from "../models/autocomplete-option";
import { WeatherService } from "../services/weather.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class WeatherResolver implements Resolve<AutocompleteOption[]> {


  private _defaultQuery: string = 'tel aviv'

  constructor(private weatherService: WeatherService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AutocompleteOption[]> | Promise<AutocompleteOption[]> | AutocompleteOption[] {
    return this.weatherService.getLocationOptions(this._defaultQuery)
  }
}
