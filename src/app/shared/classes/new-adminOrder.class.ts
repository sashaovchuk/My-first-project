import { IOrder } from '../interfaces/order.interfaces';
import { IAdminOrder } from '../interfaces/adminOrder.interfaces';

export class NewAdminOrder implements IAdminOrder {
    constructor(
        public id: number,
        public products: Array<IOrder>,
        public fullName: string,
        public phone: number,
        public adress: string,
        public suma: number
    ) { }
}