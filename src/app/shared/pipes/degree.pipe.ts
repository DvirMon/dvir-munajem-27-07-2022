import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degree'
})
export class DegreePipe implements PipeTransform {
  transform(value: 'C' | 'F' | 'Metric' | 'Imperial'): unknown {
    return value === 'C' ? '&#8451;' : '&#8457;'
  }

}
