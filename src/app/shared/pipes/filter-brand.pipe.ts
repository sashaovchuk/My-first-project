import { Pipe, PipeTransform } from '@angular/core';
import { IBrand } from '../interfaces/brand.interface';

@Pipe({
  name: 'filterBrand'
})
export class FilterBrandPipe implements PipeTransform {
  transform(arr: Array<IBrand>, val: any): any {
    if (!arr) return [];
    if (!val || val.length == 0) return arr;
    const newArr = arr.filter(it =>
      (it.name.toLowerCase().indexOf(val.toLowerCase()) != -1));
    return newArr
  }
}
