import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs";
import { environment } from "src/environments/environment"; 

@Injectable({providedIn: 'root'})
export class AccountDetailsService {
    constructor(private httpClient: HttpClient) {}

    getAccountDetails(accountId: string) {
        return this.httpClient.get(`${environment.apiUrl}/userAccount/getAccount/${accountId}`).pipe(map((response: any) => {return response}));
    }
}