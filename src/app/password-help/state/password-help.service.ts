import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { CommonResponseModel, ResetPasswordRequestModel } from "./password-help.model";

@Injectable({providedIn: 'root'})
export class PasswordHelpService {
    constructor(private httpClient: HttpClient) {
    }
  
    resetPassword(resetPasswordRequestModel: ResetPasswordRequestModel): Observable<CommonResponseModel> {
      return this.httpClient.post(`${environment.apiUrl}/auth/resetPassword`, resetPasswordRequestModel)
      .pipe(map((response: any) => { return response}));
    } 

    sendResetPasswordEmail(email: string): Observable<any> {
      return this.httpClient.post(`${environment.apiUrl}/auth/forgotPassword`, { email })
      .pipe(map((response: any) => { return response}));
    }
}
