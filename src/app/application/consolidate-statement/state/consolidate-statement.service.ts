import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs";
import { environment } from "src/environments/environment"; 

@Injectable({providedIn: 'root'})
export class ConsolidateStatementService {
    constructor(private httpClient: HttpClient) {}

    fetchStatements(filters: any) {
        return this.httpClient.post(`${environment.apiUrl}/statement/statement`, filters)
        .pipe(map((response: any) => {return response}));
    }

    getAccounts() {
      return this.httpClient.get(`${environment.apiUrl}/userAccount`)
      .pipe(map((response: any) => {return response}));
    }
}