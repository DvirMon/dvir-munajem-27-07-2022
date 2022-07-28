import { Component, Input, OnInit } from '@angular/core';
import { WeatherResult } from 'src/app/shared/components/weather-result/weather-result.component';

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
export class FavoriteCardComponent implements OnInit {

  @Input() item!: FavoriteCard

  constructor() { }

  ngOnInit(): void {
  }

}
