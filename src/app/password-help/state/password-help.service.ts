import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { CommonResponseModel, LoginResponseModel } from "./password-help.model";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import {HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PasswordHelpService {
    constructor(private httpClient: HttpClient) {
    }
  
    resetPassword(password: string): Observable<any> {
        return this.httpClient.post(`${environment.apiUrl}/auth/login`, { password })
          .pipe(
            catchError((error: any) => throwError(error))
          );
      }
      

      sendResetPasswordEmail(email: string): Observable<any> {
        return this.httpClient.post(`${environment.apiUrl}/auth/forgotpassword`, { email })
          .pipe(
            map((response: any) => response),
            catchError((error: any) => throwError(error))
          );
      }
    }
      
