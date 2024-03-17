import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs";
import { environment } from "src/environments/environment"; 

@Injectable({providedIn: 'root'})
export class ConsolidateStatementService {
    constructor(private httpClient: HttpClient) {}

    fetchFilteredData() {
      return this.httpClient.post(`${environment.apiUrl}/statement/statement`, {})
      .pipe(map((response: any) => {return response}));
  }
    fetchStatements(filters: any) {
        return this.httpClient.post(`${environment.apiUrl}/statement/statement`, filters)
        .pipe(map((response: any) => {return response}));
    }
}