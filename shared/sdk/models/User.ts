import {
    Wishlist, Jackpot
} from '../index';

export interface UserInterface {
    id?: number;
    createdAt?: number;
    updatedAt?: number;
    email: string;
    username: string;
    password: string;
    wishlists?: Wishlist[];
    jackpots?: Jackpot[];
}

export class User {
    email: string;
    username: string;
    password: string;
    wishlists?: Wishlist[];
    jackpots?: Jackpot[];

    public static getModelName() {
        return "User";
    }

    constructor(data?: UserInterface) {
        Object.assign(this, data);
    }

    public static factory(data: UserInterface): User{
        return new User(data);
    }

    public static getModelDefinition() {
        return {
            name: 'User',
            plural: 'Users',
            path: 'User',
            idName: 'id'
        }
    }
}