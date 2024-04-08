import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AddAccountService {
    constructor(private httpClient: HttpClient) { }

    addAccount(accountData: any) {
        return this.httpClient.post(`${environment.apiUrl}/useraccount/createAccount`, accountData)
        .pipe(catchError((error: any) => { return throwError(error); }));
    }

    
}
