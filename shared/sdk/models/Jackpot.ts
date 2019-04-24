import {
    Wishlist, User
} from '../index';

export interface JackpotInterface {
    id?: number;
    createdAt?: number;
    updatedAt?: number;
    name: string;
    wishlist?: Wishlist;
    wishlistId?: number;
    owner?: User;
    ownerId?: number;
}

export class Jackpot {
    id: number;
    createdAt: number;
    updatedAt: number;
    name: string;
    price?: number;
    wishlist?: Wishlist;
    wishlistId?: number;
    owner?: User;
    ownerId?: number;

    public static getModelName() {
        return "Jackpot";
    }

    constructor(data?: JackpotInterface) {
        Object.assign(this, data);
    }

    public static factory(data: JackpotInterface): Jackpot {
        return new Jackpot(data);
    }

    public static getModelDefinition() {
        return {
            name: 'Jackpot',
            plural: 'Jackpots',
            path: 'Jackpot',
            idName: 'id'
        }
    }
}