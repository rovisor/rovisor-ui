import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map,catchError } from "rxjs";
import { throwError } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class AddAccountService {
    constructor(private httpClient: HttpClient) { }
    
    addAccount(accountData: FormData) {
        return this.httpClient.post(`${environment.apiUrl}/useraccount`, accountData).pipe(catchError((error: any) => { return throwError(error); }));
    }
}