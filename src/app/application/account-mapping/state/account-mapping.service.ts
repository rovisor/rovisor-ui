import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs";
import { environment } from "src/environments/environment"; 

@Injectable({providedIn: 'root'})
export class AccountMappingService {
    constructor(private httpClient: HttpClient) {}
}