import { Pipe, PipeTransform } from '@angular/core';
import { Temperature } from 'src/app/utilities/models/current-weather-result';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {
  transform(value: Temperature, args: 'C' | 'F'): unknown {

    const key: keyof Temperature = args === 'C' ? 'Metric' : 'Imperial';
    return value[key].Value
  }

}
