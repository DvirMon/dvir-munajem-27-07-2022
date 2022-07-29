import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highLight',
  pure: true

})
export class HighLightPipe implements PipeTransform {

  constructor(

    private sanitizer: DomSanitizer
  ) { }

  transform(value: string, searchTerm: string, tag = 'strong'): any {

    if (!searchTerm) {
      return value;
    }
    // Match in a case insensitive manner
    const regex = new RegExp(searchTerm, 'i');
    const match = value.match(regex);

    // If there's no match, just return the original value.
    if (!match) {
      return value;
    }
    const replacedValue = value.replace(regex, `<${tag}>` + match[0] + `</${tag}>`)

    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }
}


