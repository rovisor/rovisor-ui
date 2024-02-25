import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, map } from "rxjs";
import { LoginResponseModel, SignUpRequestModel, SignUpResponseModel, CommonResponseModel, LoginRequestModel } from "./auth.model";

@Injectable({providedIn: 'root'})
export class AuthService {
    private isAuthenticated = false;
    constructor(private httpClient: HttpClient) {
        this.isAuthenticated = !!localStorage.getItem('token');
    }

    login(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
        return this.httpClient.post('http://localhost:5053/api/auth/login', loginRequest)
        .pipe(map((response: any) => { return response}));
    }

    signup(signupModel: SignUpRequestModel): Observable<SignUpResponseModel> {
        return this.httpClient.post('http://localhost:5053/api/auth/register', signupModel)
        .pipe(map((response: any) => {return response}));
    }
  
    resetPassword( password: string): Observable<LoginResponseModel> {
        return this.httpClient.post('http://localhost:5053/api/auth/login', { password: password})
        .pipe(map((response: any) => {return response}));
    }

    sendResetPasswordEmail(email: string): Observable<CommonResponseModel> {
        return this.httpClient.post('http://localhost:5053/api/auth/forgotpassword', {email: email})
        .pipe(map((response: any) => {return response}));
    }

    isAuthenticatedUser(): boolean {
        return this.isAuthenticated;
    }

    setAuthenticatedUser(isAuthenticated: boolean): void {
        this.isAuthenticated = isAuthenticated;
    }
    
    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.isAuthenticated = false;
    }
}