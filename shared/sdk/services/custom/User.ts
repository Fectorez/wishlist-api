import { Injectable, Inject, Optional } from '@angular/core';
import { BaseSailsApi } from '../core/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wishlist, Jackpot } from '../../models';

@Injectable()
export class UserApi extends BaseSailsApi {
    private wishlistRelation: string = Wishlist.getModelDefinition().plural.toLowerCase() + '/';
    private jackpotRelation: string = Jackpot.getModelDefinition().plural.toLowerCase() + '/';

    constructor(
        @Inject(HttpClient) protected http: HttpClient,
    ) {
        super(http, 'user');
    }

    public findByIdWishlists<Wishlist>(id: number): Observable<Wishlist[]> {
        return this.http.get<Wishlist[]>(this.actionUrl + id + '/' + this.wishlistRelation);
    }

    public createWishlist<Wishlist>(id: number, data: Wishlist): Observable<Wishlist> {
        return this.http.post<Wishlist>(this.actionUrl + id + '/' + this.wishlistRelation, data);
    }

    public findByIdJackpots<Jackpot>(id: number): Observable<Jackpot[]> {
        return this.http.get<Jackpot[]>(this.actionUrl + id + '/' + this.jackpotRelation);
    }

    public createJackpot<Jackpot>(id: number, data: Jackpot): Observable<Jackpot> {
        return this.http.post<Jackpot>(this.actionUrl + id + '/' + this.jackpotRelation, data);
    }
}