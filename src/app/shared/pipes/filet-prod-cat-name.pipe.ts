import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Pipe({
  name: 'filterProdCatName'
})
export class FiletProdCatNamePipe implements PipeTransform {
  transform(arr: Array<IProduct>, val: any, key: string): any {
    if (!arr) return [];
    if (!val || val.length == 0) return arr;
    const newArr = arr.filter(it =>
      (it.category.name.toLowerCase().indexOf(val.toLowerCase()) != -1));
    return newArr
  }
}