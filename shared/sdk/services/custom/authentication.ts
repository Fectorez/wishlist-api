import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../..';
import { SailsConfig } from '../../sails.config';
import { getToken } from '@angular/router/src/utils/preactivation';
import { UserApi } from './User';

@Injectable()
export class AuthenticationApi {

    private loginPath = 'login/';
    private logoutPath = 'logout/';
     
    constructor(private http: HttpClient,
                private userApi: UserApi
    ) {
    }
      
    public login(credentials: any): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(SailsConfig.getPath() + '/' + this.loginPath, credentials);
    }

    public logout(): Observable<any> {
        return this.http.get<any>(SailsConfig.getPath() + '/' + this.logoutPath);
    }

    public storeInfo(loginResponse: LoginResponse): void {
        localStorage.setItem("token", loginResponse.user.token);
        localStorage.setItem("id", loginResponse.user.id.toString());
        localStorage.setItem("email", loginResponse.user.email);
    }

    public removeInfo(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("email");
    }

    public getToken(): string {
        return localStorage.getItem("token");
    }

    public getCurrentUserId(): number {
        return +localStorage.getItem("id");
    }

    public getCurrentUserEmail(): string {
        return localStorage.getItem("email");
    }

    public isAuthenticated(): boolean {
        return !(this.getToken() == null || this.getToken() == '' || this.getToken() == 'null');
    }

    public getCurrentUser(): Observable<User> {
        return this.userApi.findById(this.getCurrentUserId());
    }
}

export class LoginResponse {
    message: string;
    user: {
        id: number;
        email: string;
        token: string;
    }
}