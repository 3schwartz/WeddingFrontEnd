import { Guest } from './guest';

export class Address {
    id?: number;
    homeAddress: string;
    guests?: Guest[];

    constructor(homeAddress: string, guests: Guest[], id?: number) {
        this.homeAddress = homeAddress;
        this.guests = guests;
        this.id = id;
    }

}
