import { Component, inject, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, merge, Observable, of, startWith, Subject, switchMap, take, tap } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { FavoriteCard } from 'src/app/favorites/components/favorite-card/favorite-card.component';
import { AppActions } from 'src/app/ngrx/app.types';
import { SelectChangeEvent, WeatherResult } from 'src/app/shared/components/weather-result/weather-result.component';
import { AutocompleteOption } from 'src/app/utilities/models/autocomplete-option';
import { WeatherService } from 'src/app/utilities/services/weather.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  weatherService: WeatherService = inject(WeatherService)

  private _defaultQuery: string = 'tel aviv'

  constructor(
    private nfb: NonNullableFormBuilder,
    private store: Store<any>
  ) { }


  searchControl!: FormControl

  weatherResult$!: Observable<Partial<WeatherResult> | null>
  options$!: Observable<AutocompleteOption[]>

  selectedOptionSource$: BehaviorSubject<AutocompleteOption | null> = new BehaviorSubject<AutocompleteOption | null>(null)
  selectedOption$!: Observable<AutocompleteOption | null>

  ngOnInit(): void {

    this.selectedOption$ = this.selectedOptionSource$.asObservable()
    this.searchControl = this.nfb.control('')
    this.options$ = this._getLocationOptions()
    this.weatherResult$ = this.getWeatherResult()

  }

  private _listenToSearchQuery() {
    return this.searchControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
  }

  private _getLocationOptions() {

    const init$ = this.weatherService.getLocationOptions(this._defaultQuery).pipe(
      take(1),
      tap((options: AutocompleteOption[]) => {
        this.searchControl.setValue(options[0], { emitEvent: false })
        this.selectedOptionSource$.next(options[0])
      }))

    const valueChange$ = this._listenToSearchQuery().pipe(
      filter((query: string) => !!query),
      switchMap((query: string) => this.weatherService.getLocationOptions(query)))


    const default$ = this._listenToSearchQuery().pipe(
      filter((query: string) => !query),
      switchMap(() => this.weatherService.getLocationOptions(this._defaultQuery))
    )

    return merge(init$, valueChange$, default$)
  }

  private getWeatherResult() {
    return this.selectedOption$.pipe(
      filter((option) => !!option),
      map((option) => option as AutocompleteOption),
      switchMap((option: AutocompleteOption) => this.weatherService.getWeatherResult(option)))

  }
  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const option: AutocompleteOption = event.option.value;
    this.selectedOptionSource$.next(option);
  }

  onSelectChange({ selected, source }: SelectChangeEvent) {

    const action = selected
      ? AppActions.SetFavorite({ data: source as FavoriteCard })
      : AppActions.DeleteFavorite({ data: source as FavoriteCard });


    this.store.dispatch(action)

  }

  displayFn(option: AutocompleteOption): string {
    return option && option.value ? option.value : '';
  }


}
