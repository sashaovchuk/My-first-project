import { ISubscriber } from '../interfaces/subscriber.interface';

export class NewSubscriber implements ISubscriber{
    constructor(
    public id: string,
    public fullName: string,
    public email: string
    ){}
}