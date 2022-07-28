import { Component, inject, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, merge, Observable, of, startWith, switchMap, take, tap } from 'rxjs';
import { WeatherResult } from 'src/app/shared/components/weather-result/weather-result.component';
import { AutocompleteOption } from 'src/app/utilities/models/autocomplete-option';
import { WeatherService } from 'src/app/utilities/services/weather.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  weatherService: WeatherService = inject(WeatherService)
  constructor(
    private nfb: NonNullableFormBuilder,
    private store: Store<any>
  ) { }


  searchControl = this.nfb.control('tel aviv')

  weatherResult$!: Observable<Partial<WeatherResult> | null>
  options$!: Observable<AutocompleteOption[]>

  selectedOptionSource$!: BehaviorSubject<string>
  selectedOption$!: Observable<string>

  ngOnInit(): void {

    this.options$ = this.getLocationOptions()

    this.selectedOptionSource$ = new BehaviorSubject<string>(this.searchControl.value)
    this.selectedOption$ = this.selectedOptionSource$.asObservable()

    this.weatherResult$ = this.getLobbyWeather()

  }

  private listenToSearchQuery() {
    return this.searchControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged(), startWith(this.searchControl.value))
  }

  private getLocationOptions() {
    const true$ = this.listenToSearchQuery().pipe(
      filter((query: string) => !!query),
      switchMap((query: string) => this.weatherService.getLocationOptions(query)))

    const false$ = this.listenToSearchQuery().pipe(
      filter((query: string) => !query),
      switchMap(() => this.weatherService.getLocationOptions('tel aviv')))

    return merge(true$, false$)
  }

  private getLobbyWeather() {
    const true$ = this.selectedOption$.pipe(
      filter((query: string) => !!query),
      switchMap((query: string) => this.weatherService.getWeather(query)))

    const false$ = this.selectedOption$.pipe(
      filter((query: string) => !query),
      switchMap(() => this.weatherService.getWeather('tel aviv')))

    return merge(true$, false$)
  }



  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const value: string = event.option.value;
    this.selectedOptionSource$.next(value);
  }

}
