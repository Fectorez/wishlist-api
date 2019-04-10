import {
    Wishlist
} from '../index';

export interface UserInterface {
    id?: number;
    createdAt?: number;
    updatedAt?: number;
    email: string;
    username: string;
    password: string;
    wishlists?: Wishlist[];
}

export class User {
    email: string;
    username: string;
    password: string;
    wishlists?: Wishlist[];

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