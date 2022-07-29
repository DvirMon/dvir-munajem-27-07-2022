import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluck'
})
export class PluckPipe<T> implements PipeTransform {

  // transform(value: Object, args: keyof Object): unknown {
  transform(value: Object, args: keyof Object): unknown {

    if (args.length === 0) {
      throw new Error('Pluck pipe must get Object key as args')
    }

    const key = args as keyof Object
    return value.hasOwnProperty(key) ? value[key] : 'key not found';
  }

  findValue(obj: Object, key: keyof Object) {

    if (obj.hasOwnProperty(key) && typeof obj[key] === 'string') { }
  }

}
