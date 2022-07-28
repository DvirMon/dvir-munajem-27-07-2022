import { Component, Input, OnInit } from '@angular/core';


export interface WeatherForecast {
  date: Date,
  day: string,
  temp: number

}

export interface WeatherResult {
  id: number
  location: string
  description: string
  temp: number,
  forecast: WeatherForecast[]
  favorite: boolean
}

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.scss']
})
export class WeatherResultComponent implements OnInit {


  @Input() weatherResult!: Partial<WeatherResult>

  selected!: boolean

  constructor() { }

  ngOnInit(): void {

    this.selected = this.weatherResult.favorite as boolean;
  }

  onSelectChange() {
    this.selected = !this.selected
  }

}
