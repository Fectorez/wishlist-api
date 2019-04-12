import { Injectable, Inject, Optional } from '@angular/core';
import { BaseSailsApi } from '../core/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wishlist } from '../../models';

@Injectable()
export class UserApi extends BaseSailsApi {
    private wishlistRelation: string = Wishlist.getModelDefinition().plural.toLowerCase() + '/';

    constructor(
        @Inject(HttpClient) protected http: HttpClient,
    ) {
        super(http, 'user');
    }

    public findByIdWishlists<Wishlist>(id: number): Observable<Wishlist> {
        return this.http.get<Wishlist>(this.actionUrl + id + '/' + this.wishlistRelation);
    }

    public createWishlist<Wishlist>(id: number, data: Wishlist): Observable<Wishlist> {
        return this.http.post<Wishlist>(this.actionUrl + id + '/' + this.wishlistRelation, data);
    }
}