import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Pipe({
  name: 'filterProdBrName'
})
export class FilterProdBrNamePipe implements PipeTransform {
  transform(arr: Array<IProduct>, val: any): any {
    if (!arr) return [];
    if (!val || val.length == 0) return arr;
    const newArr = arr.filter(it =>
      (it.brand.name.toLowerCase().indexOf(val.toLowerCase()) != -1));
    return newArr
  }
}
