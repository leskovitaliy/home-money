import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEvents'
})
export class FilterEventsPipe implements PipeTransform {

  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter(i => {
      const itemCopy = Object.assign({}, i);

      if (!isNaN(itemCopy[field])) {
        itemCopy[field] += '';
      }

      if (field === 'type') {
        itemCopy[field] = itemCopy[field] === 'income' ? 'доход' : 'расход';
      }

      if (field === 'category') {
        itemCopy[field] = itemCopy['categoryName'];
      }

      return itemCopy[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

}
