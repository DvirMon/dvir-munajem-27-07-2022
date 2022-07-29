import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degree'
})
export class DegreePipe implements PipeTransform {
  transform(value: boolean | null): unknown {
    return value ? '&#8451;' : '&#8457;'
  }

}
