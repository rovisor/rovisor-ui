import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs";
import { environment } from "src/environments/environment"; 

@Injectable({providedIn: 'root'})
export class ArchiveStatementService {
    constructor(private httpClient: HttpClient) {}

    fetchStatements() {
        return this.httpClient.post(`${environment.apiUrl}/statement/statement`, {})
        .pipe(map((response: any) => {return response}));
    }
}