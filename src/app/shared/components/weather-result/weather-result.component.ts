import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Temperature } from 'src/app/utilities/models/current-weather-result';


export interface WeatherForecast {
  date: Date,
  temp: number
}

export interface WeatherResult {
  id: number
  location: string
  description: string
  temp: Temperature,
  forecast: WeatherForecast[]
  favorite: boolean
}

export interface SelectChangeEvent {
  selected: boolean,
  source: Partial<WeatherResult>
}
export interface TempChangeEvent {
  metric: boolean,
}

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.scss']
})
export class WeatherResultComponent {

  defaultTemp: 'C' | 'F' = 'C'


  @Input() weatherResult!: Partial<WeatherResult>
  @Input() metric!: boolean | null

  @Output() selectChanged: EventEmitter<SelectChangeEvent> = new EventEmitter();
  @Output() degreeChanged: EventEmitter<TempChangeEvent> = new EventEmitter();

  constructor() { }

  onSelectChange(): void {
    this._emitChange()
  }

  onDegreeChange() {
    this.degreeChanged.emit({ metric: !this.metric })
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
    this.selectChanged.emit({ selected: !this.weatherResult.favorite as boolean, source: this._setPartialWeatherResult() })
  }




}
