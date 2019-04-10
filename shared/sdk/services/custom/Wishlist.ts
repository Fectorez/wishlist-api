import { Injectable, Inject, Optional } from '@angular/core';
import { BaseSailsApi } from '../core/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WishlistApi extends BaseSailsApi {

    constructor(
        @Inject(HttpClient) protected http: HttpClient,
    ) {
        super(http, 'wishlist');
    }
}