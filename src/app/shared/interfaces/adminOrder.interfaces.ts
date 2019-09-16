import { IOrder } from './order.interfaces';

export interface IAdminOrder{
    id: number;
    products: Array<IOrder>;
    fullName: string;
    phone: number;
    adress: string;
    suma: number;
}