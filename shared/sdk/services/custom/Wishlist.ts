import { Injectable, Inject, Optional } from '@angular/core';
import { BaseSailsApi } from '../core/base.service';
import { HttpClient } from '@angular/common/http';
import { Item, Jackpot } from '../../models/index';
import { Observable } from 'rxjs';

@Injectable()
export class WishlistApi extends BaseSailsApi {
    private itemRelation: string = Item.getModelDefinition().plural.toLowerCase() + '/';
    private jackpotRelation: string = Jackpot.getModelDefinition().plural.toLowerCase() + '/';

    constructor(
        @Inject(HttpClient) protected http: HttpClient,
    ) {
        super(http, 'wishlist');
    }

    public findByIdItems<Item>(id: number): Observable<Item[]> {
        return this.http.get<Item[]>(this.actionUrl + id + '/' + this.itemRelation);
    }

    public createItem<Item>(id: number, data: Item): Observable<Item> {
        return this.http.post<Item>(this.actionUrl + id + '/' + this.itemRelation, data);
    }

    public findByIdJackpots<Jackpot>(id: number): Observable<Jackpot[]> {
        return this.http.get<Jackpot[]>(this.actionUrl + id + '/' + this.jackpotRelation);
    }

    public createJackpot<Jackpot>(id: number, data: Jackpot): Observable<Jackpot> {
        return this.http.post<Jackpot>(this.actionUrl + id + '/' + this.jackpotRelation, data);
    }
}