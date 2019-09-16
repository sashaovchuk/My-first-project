import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Pipe({
  name: 'currencys'
})
export class CurrencysPipe implements PipeTransform {

  transform(value: any, symbol?:string): any {
    if (value===null) return null;
    if (symbol === undefined) symbol = '$';
    value = value + `${symbol}`;
    return value
  }

}
