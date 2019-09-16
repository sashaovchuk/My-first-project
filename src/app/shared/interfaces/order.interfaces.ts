import { IProduct } from './product.interface';

export interface IOrder{
    id: number;
    product: IProduct;
    count: number;
}