import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Temperature } from 'src/app/utilities/models/current-weather-result';
import { WeatherService } from 'src/app/utilities/services/weather.service';

export interface FavoriteCard {
  id: number,
  description: string,
  location: string,
  temp: Temperature,
}

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent {

  @Input() item!: FavoriteCard
  @Input() metric!: boolean | null

  constructor(
    private router: Router,
    private weatherService: WeatherService
  ) { }

  onSelect() {
    this.weatherService.emitSearchQuery(this.item.location)
    this.router.navigateByUrl('/')
  }

}
