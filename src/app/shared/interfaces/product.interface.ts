import { ICategory } from './category.interface';
import { IBrand } from './brand.interface';

export interface IProduct{
    id: number;
    category: ICategory;
    brand: IBrand;
    model: string;
    size: string;
    material: string;
    description: string;
    price: number;
    image?: string;
}