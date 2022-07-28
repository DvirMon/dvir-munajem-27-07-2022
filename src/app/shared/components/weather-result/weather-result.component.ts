import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


export interface WeatherForecast {
  date: Date,
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

export interface SelectChangeEvent {
  selected: boolean,
  source: Partial<WeatherResult>
}

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.scss']
})
export class WeatherResultComponent {


  @Input() weatherResult!: Partial<WeatherResult>

  @Output() selectChange: EventEmitter<SelectChangeEvent> = new EventEmitter();

  constructor() { }

  onSelectChange(): void {
    this._emitChange()
  }

  private _setPartialWeatherResult(): Partial<WeatherResult> {
    return {
      id: this.weatherResult.id,
      description: this.weatherResult.description,
      location: this.weatherResult.location,
      temp: this.weatherResult.temp,
    }
  }

  private _emitChange() {
    this.selectChange.emit({ selected: !this.weatherResult.favorite as boolean, source: this._setPartialWeatherResult() })
  }




}
