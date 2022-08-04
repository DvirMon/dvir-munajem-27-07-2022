import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit'
})
export class UnitTemperaturePipe implements PipeTransform {
  transform(value: boolean | null, type: 'temp' | 'length' | 'time' | 'amount' | 'mass'): unknown {

    switch (type) {
      case 'temp':
        return value ? '&#8451;' : '&#8457;'
      default:
        return ''
    }


  }

}
