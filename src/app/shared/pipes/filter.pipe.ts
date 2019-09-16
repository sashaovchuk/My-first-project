import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(arr: Array<ICategory>, val: any): any {
    if (!arr) return [];
    if (!val || val.length == 0) return arr;
    const newArr = arr.filter(it =>
      (it.name.toLowerCase().indexOf(val.toLowerCase()) != -1) ||
      (it.gender.toLowerCase().indexOf(val.toLowerCase()) != -1));
    return newArr
  }
}
