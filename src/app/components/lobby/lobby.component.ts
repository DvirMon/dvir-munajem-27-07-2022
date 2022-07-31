import { Component, inject, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';

import { SelectChangeEvent, TempChangeEvent, WeatherResult } from 'src/app/shared/components/weather-result/weather-result.component';
import { FavoriteCard } from 'src/app/favorites/components/favorite-card/favorite-card.component';
import { AutocompleteOption } from 'src/app/utilities/models/autocomplete-option';
import { WeatherService } from 'src/app/utilities/services/weather.service';

import { AppActions, AppSelectors } from 'src/app/ngrx/app.types';
import { Store } from '@ngrx/store';

import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, merge, Observable, Subject, switchMap, tap } from 'rxjs';

@Component({

  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  weatherService: WeatherService = inject(WeatherService)

  private _defaultQuery: string = 'tel aviv'

  constructor(
    private activatedRoute: ActivatedRoute,
    private nfb: NonNullableFormBuilder,
    private store: Store<any>,
  ) { }


  searchControl!: FormControl<AutocompleteOption>

  weatherResult$!: Observable<Partial<WeatherResult> | null>
  options$!: Observable<AutocompleteOption[]>
  metric$!: Observable<boolean>

  selectedOptionSource$: BehaviorSubject<AutocompleteOption | null> = new BehaviorSubject<AutocompleteOption | null>(null)
  queryChangeSource$: Subject<string> = new Subject<string>()

  ngOnInit(): void {
    this.searchControl = this.nfb.control({} as AutocompleteOption)
    this.options$ = this._getLocationOptions()
    this.weatherResult$ = this._getWeatherResult()
    this.metric$ = this.store.select(AppSelectors.isMetric)
  }

  private _initOptions(): Observable<AutocompleteOption[]> {
    return this.activatedRoute.data.pipe(
      map(({ options }) => {
        return options as AutocompleteOption[]
      }),
      tap((options: AutocompleteOption[]) => {
        this.searchControl.setValue(options[0], { emitEvent: false })
        this.selectedOptionSource$.next(options[0])
      }))
  }

  private _listenToSearchQuery(): Observable<string> {
    return this.queryChangeSource$.asObservable().pipe(debounceTime(500), distinctUntilChanged())
  }

  private _getLocationOptions(): Observable<AutocompleteOption[]> {

    const init$ = this._initOptions().pipe(tap(() => console.log('init')))

    const queryChanged$ = this._listenToSearchQuery().pipe(
      tap(() => console.log('queryChanged')),
      filter((query: string) => !!query),
      switchMap((query: string) => this.weatherService.getLocationOptions(query)))


    const default$ = this._listenToSearchQuery().pipe(
      filter((query: string) => !query),
      switchMap(() => this.weatherService.getLocationOptions(this._defaultQuery))
    )

    return merge(init$, queryChanged$, default$)
  }

  private _getWeatherResult(): Observable<WeatherResult | null> {
    return this.selectedOptionSource$.asObservable().pipe(
      filter((option) => !!option),
      map((option) => option as AutocompleteOption),
      switchMap((option: AutocompleteOption) => this.weatherService.getWeatherResult(option)))

  }

  private updateQuery(query: string) {
    const action = AppActions.UpdateQuery({ data: query })
    this.store.dispatch(action)
  }

  onQueryChange(query: string): void {
    this.queryChangeSource$.next(query)
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const option: AutocompleteOption = event.option.value;
    this.selectedOptionSource$.next(option);
    this.queryChangeSource$.next(option.value.LocalizedName);
    this.updateQuery(option.value.LocalizedName)
  }

  onSelectChange({ selected, source }: SelectChangeEvent): void {
    const action = selected
      ? AppActions.SetFavorite({ data: source as FavoriteCard })
      : AppActions.DeleteFavorite({ data: source as FavoriteCard });
    this.store.dispatch(action)
  }

  onDegreeChange({ metric }: TempChangeEvent): void {
    const action = AppActions.SetDegree({ data: metric });
    this.store.dispatch(action)

  }

  displayFn(option: AutocompleteOption): string {

    return option && option.value ? `${option.value.LocalizedName}` : '';
  }


}
