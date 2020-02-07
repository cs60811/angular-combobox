import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], key: string, value: string): any {
    console.log(value);
    return list.filter(i => i[key] === value);
  }

}