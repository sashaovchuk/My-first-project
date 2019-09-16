import { IBrand } from '../interfaces/brand.interface';

export class NewBrand implements IBrand{
    constructor(
        public id: number,
        public name: string,
        public image?: string
    ){}
}