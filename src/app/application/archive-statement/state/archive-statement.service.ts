import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs";

@Injectable({providedIn: 'root'})
export class ArchiveStatementService {
    constructor(private httpClient: HttpClient) {}

    fetchStatements() {
        
       
        return this.httpClient.post('http://localhost:5000/api/statement/statement', {})
        .pipe(map((response: any) => {return response}));
    }
}