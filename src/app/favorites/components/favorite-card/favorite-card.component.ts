import { Component, Input, OnInit } from '@angular/core';
import { WeatherResult } from 'src/app/shared/components/weather-result/weather-result.component';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {

  @Input() item!: Partial<WeatherResult>

  constructor() { }

  ngOnInit(): void {
  }

}
