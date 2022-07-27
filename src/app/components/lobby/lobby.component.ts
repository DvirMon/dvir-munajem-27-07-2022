import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/utilities/services/weather.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor() { }

  weatherService: WeatherService = inject(WeatherService)

  defaultQuery: string = 'tttt'

  result$: Observable<any> = this.weatherService.getWeather(this.defaultQuery)

  ngOnInit(): void {



  }

}
