import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Pipe({
  name: 'filterRange'
})
export class FilterRangePipe implements PipeTransform {

  transform(arr: Array<IProduct>, minteamFil?: any, maxteamFil?: any): any {
    // console.log('teamFil', minteamFil, maxteamFil);
    if (!arr) return [];
     const newArr = arr.filter(range => range.price >= minteamFil && range.price <= maxteamFil);
    return newArr
}

}
