import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


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

export interface SelectChangeEvent {
  selected: boolean,
  source: Partial<WeatherResult>
}

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.scss']
})
export class WeatherResultComponent implements OnInit {


  @Input() weatherResult!: Partial<WeatherResult>

  selected!: boolean

  @Output() selectChange: EventEmitter<SelectChangeEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

    this.selected = this.weatherResult.favorite as boolean;
  }

  onSelectChange(): void {
    this.selected = !this.selected
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
    this.selectChange.emit({ selected: this.selected, source: this._setPartialWeatherResult() })
  }




}
