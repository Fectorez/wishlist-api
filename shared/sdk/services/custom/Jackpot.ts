import { Injectable, Inject, Optional } from '@angular/core';
import { BaseSailsApi } from '../core/base.service';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../models/index';
import { Observable } from 'rxjs';

@Injectable()
export class JackpotApi extends BaseSailsApi {
    private itemRelation: string = Item.getModelDefinition().plural.toLowerCase() + '/';

    constructor(
        @Inject(HttpClient) protected http: HttpClient,
    ) {
        super(http, 'jackpot');
    }

    public findByIdItems<Item>(id: number): Observable<Item[]> {
        return this.http.get<Item[]>(this.actionUrl + id + '/' + this.itemRelation);
    }

    public createItem<Item>(id: number, data: Item): Observable<Item> {
        return this.http.post<Item>(this.actionUrl + id + '/' + this.itemRelation, data);
    }
}