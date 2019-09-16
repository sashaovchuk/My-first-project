import { IOrder } from '../interfaces/order.interfaces';
import { IProduct } from '../interfaces/product.interface';

export class NewOrder implements IOrder {
    constructor(
        public id: number,
        public product: IProduct,
        public count: number
    ) { }
}