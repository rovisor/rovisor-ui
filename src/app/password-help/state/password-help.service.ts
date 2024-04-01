import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { CommonResponseModel, LoginResponseModel } from "./password-help.model";

@Injectable({providedIn: 'root'})
export class PasswordHelpService {
    constructor(private httpClient: HttpClient) {
    }
  
    resetPassword( password: string): Observable<LoginResponseModel> {
        return this.httpClient.post(`${environment.apiUrl}/auth/login`, { password: password})
        .pipe(map((response: any) => {return response}));
    }

    sendResetPasswordEmail(email: string): Observable<CommonResponseModel> {
        return this.httpClient.post(`${environment.apiUrl}/auth/forgotpassword`, {email: email})
        .pipe(map((response: any) => {return response}));
    }
}