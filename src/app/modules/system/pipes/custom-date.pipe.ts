import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string, formatFrom: string, formatTo: string = 'DD.MM.YYYY'): string {
    return moment(value, formatFrom).format(formatTo);
  }

}
