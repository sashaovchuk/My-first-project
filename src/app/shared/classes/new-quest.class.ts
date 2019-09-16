import { IQuest } from '../interfaces/quest.interface';

export class Quest implements IQuest {
    constructor(
        public id: number,
        public who: string,
        public topic: string,
        public message: string,
        public date: Date
    ) { }
}