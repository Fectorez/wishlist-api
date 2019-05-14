export class LoginResponse {
    message: string;
    user: {
        id: number;
        email: string;
        token: string;
    }
}