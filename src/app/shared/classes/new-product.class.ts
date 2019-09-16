import { IProduct } from '../interfaces/product.interface';
import { ICategory } from '../interfaces/category.interface';
import { IBrand } from '../interfaces/brand.interface';

export class NewProduct implements IProduct{
    constructor(
        public id: number,
        public category: ICategory,
        public brand: IBrand,
        public model: string,
        public size: string,
        public material: string,
        public description: string,
        public price: number,
        public image?: string
    ){}
}