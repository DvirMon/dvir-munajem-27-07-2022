import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Temperature } from 'src/app/utilities/models/current-weather-result';
import { DailyTemperature } from 'src/app/utilities/models/future-weather-result';


export interface WeatherForecast {
  date: Date,
  temp: DailyTemperature
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
export interface UnitChangeEvent {
  metric: boolean,
}

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.scss']
})
export class WeatherResultComponent {

  @Input() weatherResult!: Partial<WeatherResult>
  @Input() metric!: boolean | null

  @Output() selectChanged: EventEmitter<SelectChangeEvent> = new EventEmitter();
  @Output() unitChanged: EventEmitter<UnitChangeEvent> = new EventEmitter();

  constructor() { }


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

  onSelectChange(): void {
    this._emitChange()
  }


  onUnitChange(event: MatButtonToggleChange) {
    const { value } = event
    this.unitChanged.emit({ metric: value })
  }





}
