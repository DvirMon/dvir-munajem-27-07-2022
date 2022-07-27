import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutocompleteResult } from 'src/app/models/weather';
import { WeatherService } from 'src/app/utilities/services/weather.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor() { }

  weatherService: WeatherService = inject(WeatherService)

  defaultQuery: string = 'tel aviv'

  result$: Observable<AutocompleteResult[]> = this.weatherService.locationAutocomplete(this.defaultQuery)

  ngOnInit(): void {



  }

}
