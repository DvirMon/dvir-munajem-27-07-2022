import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherResult } from 'src/app/shared/components/weather-result/weather-result.component';
import { WeatherService } from 'src/app/utilities/services/weather.service';

export interface FavoriteCard {
  id: number,
  description: string,
  location: string,
  temp: number,
}

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent {

  @Input() item!: FavoriteCard

  constructor(
    private router: Router,
    private weatherService: WeatherService
  ) { }

  onSelect() {
    this.weatherService.emitSearchQuery(this.item.location)
    this.router.navigateByUrl('/')
  }

}
