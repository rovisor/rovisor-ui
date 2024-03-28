import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr'; 

@Injectable({ providedIn: 'root' })
export class AccountMappingService {
    constructor(
        private httpClient: HttpClient,
        private toastr: ToastrService 
    ) { }

   
    submitFormData(formData: any){
        const apiUrl = `${environment.apiUrl}apiUrl`; 
        return this.httpClient.post(apiUrl, formData)
            .pipe(
                catchError((error: any) => {
                    this.toastr.error('Error submitting form data'); 
                    return throwError(error);
                })
            );
    }
}
