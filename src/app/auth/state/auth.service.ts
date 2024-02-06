import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, map } from "rxjs";
import { LoginResponseModel, SignUpRequestModel, SignUpResponseModel } from "./auth.model";

@Injectable({providedIn: 'root'})
export class AuthService {
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

    sendrestepasswordemail(email: string): Observable<SignUpResponseModel> {
        let params = new HttpParams();

    
    params = params.append('email', email);
        return this.httpClient.get('http://localhost:5000/api/auth/reste-password',{params} )
        .pipe(map((response: any) => {return response}));
    }
}