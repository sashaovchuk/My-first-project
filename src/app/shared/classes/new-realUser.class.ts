import { IRealUser } from '../interfaces/realUser.interface';

export class NewRealUser implements IRealUser{
    constructor(
    public id: string,
    public fname: string,
    public sname: string,
    public login: string,
    public password: string,
    public phone?: number,
    public adress?: string
    ){}
}