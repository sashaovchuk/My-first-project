import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Pipe({
  name: 'pordFirst'
})
export class PordFirstPipe implements PipeTransform {
  transform(value: string[], filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item)
      }
    }
    return resultArray;
  }
  // transform(arr: Array<IProduct>, val: any): any {
  //   if (!arr) return [];
  //   if (!val || val.length == 0) return arr;
  //   const newArr = arr.sort();
  //   return newArr
  // }
}
