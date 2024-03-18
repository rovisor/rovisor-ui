import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment"; 

@Injectable({'providedIn': 'root'})
export class SharedService {
  constructor(private http: HttpClient) {
  }

  getSidenavItems() {
    return this.http.get('/assets/data/sidebar.json').pipe(map((response: any) => {return response}));
  }
  
  getAccounts() {
    return this.http.get(`${environment.apiUrl}/userAccount`).pipe(map((response: any) => {return response}));
  }
}