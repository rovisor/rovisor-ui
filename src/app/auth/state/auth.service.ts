import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, map } from "rxjs";
import { LoginResponseModel, SignUpRequestModel, SignUpResponseModel, CommonResponseModel } from "./auth.model";

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private httpClient: HttpClient) { }

    login(email: string, password: string): Observable<LoginResponseModel> {
        return this.httpClient.post('http://localhost:5053/api/auth/login', {email: email, password: password})
        .pipe(map((response: any) => {return response}));
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
}