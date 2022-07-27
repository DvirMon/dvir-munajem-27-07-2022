import { Component, inject, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, of, startWith, switchMap, take, tap } from 'rxjs';
import { WeatherService } from 'src/app/utilities/services/weather.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor(
    private nfb: NonNullableFormBuilder
  ) { }

  weatherService: WeatherService = inject(WeatherService)
  searchControl = this.nfb.control('tel aviv')



  result$!: Observable<any>

  ngOnInit(): void {

    this.result$ = this.getLobbyWeather().pipe(tap((res) => console.log(res)))



  }

  private getLobbyWeather() {
    const true$ = this.listenToSearchQuery().pipe(
      filter((query: string) => !!query),
      switchMap((query: string) => this.weatherService.getWeather(query)))

    const false$ = this.listenToSearchQuery().pipe(
      filter((query: string) => !query),
      switchMap(() => this.weatherService.getWeather('tel aviv')))

    return merge(true$, false$)
  }

  private listenToSearchQuery() {
    return this.searchControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged(), startWith(this.searchControl.value))
  }

}
