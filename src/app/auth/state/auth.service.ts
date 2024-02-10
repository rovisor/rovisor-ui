import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable, map } from "rxjs";
import { LoginResponseModel, SignUpRequestModel, SignUpResponseModel } from "./auth.model";

@Injectable({providedIn: 'root'})
export class AuthService {
    resetPassword(value: any) {
      throw new Error('Method not implemented.');
    }
    constructor(private httpClient: HttpClient) {

    }

    login(email: string, password: string): Observable<LoginResponseModel> {
        return this.httpClient.post('http://localhost:5000/api/auth/login', {email: email, password: password})
        .pipe(map((response: any) => {return response}));
    }

    signup(signupModel: SignUpRequestModel): Observable<SignUpResponseModel> {
        return this.httpClient.post('http://localhost:5000/api/auth/register', signupModel)
        .pipe(map((response: any) => {return response}));
    }
    ResetPassword( password: string): Observable<LoginResponseModel> {
        return this.httpClient.post('http://localhost:5000/api/auth/login', { password: password})
        .pipe(map((response: any) => {return response}));
    }
}