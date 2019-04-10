import {
    User, Item
} from '../index';

export interface WishlistInterface {
    id?: number;
    createdAt?: number;
    updatedAt?: number;
    name: string;
    owner?: User;
    ownerId?: User;
    items?: Item[];
}

export class Wishlist {
    id: number;
    createdAt: number;
    updatedAt: number;
    name: string;
    owner?: User;
    ownerId?: User;
    items?: Item[];

    public static getModelName() {
        return "Wishlist";
    }

    constructor(data?: WishlistInterface) {
        Object.assign(this, data);
    }

    public static factory(data: WishlistInterface): Wishlist{
        return new Wishlist(data);
    }

    public static getModelDefinition() {
        return {
            name: 'Wishlist',
            plural: 'Wishlists',
            path: 'Wishlist',
            idName: 'id'
        }
    }
}