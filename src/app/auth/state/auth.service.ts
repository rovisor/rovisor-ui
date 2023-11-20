import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from "rxjs";
import { LoginResponseModel, SignupRequestModel, SignupResponseModel } from "./auth.model";

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private httpClient: HttpClient) {

    }

    login(email: string, password: string): Observable<LoginResponseModel> {
        return this.httpClient.post('http://localhost:5053/api/auth/login', {email: email, password: password})
        .pipe(map((response: any) => {return response}));
    }

    signup(signupModel: SignupRequestModel): Observable<SignupResponseModel> {
        return this.httpClient.post('http://localhost:5053/api/auth/signup', signupModel)
        .pipe(map((response: any) => {return response}));
    }
}