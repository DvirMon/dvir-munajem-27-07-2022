import { Pipe, PipeTransform } from '@angular/core';
import { DailyTemperature } from 'src/app/utilities/models/future-weather-result';

@Pipe({
  name: 'dailyTemperature'
})
export class DailyTemperaturePipe implements PipeTransform {
  transform(value: DailyTemperature, args?: 'min' | 'max' | undefined): unknown {

    if (!args) {
      return `${value.Minimum.Value} - ${value.Maximum.Value}`
    } else {

      const key: keyof DailyTemperature = args === 'min' ? 'Minimum' : 'Maximum';
      return value[key].Value
    }
  }

}
