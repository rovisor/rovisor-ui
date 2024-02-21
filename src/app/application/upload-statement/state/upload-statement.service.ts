import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class UploadStatementService {
    constructor(
        private httpClient: HttpClient,
        private toastr: ToastrService
    ) { }

    uploadStatement(formData: FormData) {
        const apiUrl = "http://localhost:5053/api/FileUpload/upload"
        return this.httpClient.post('apiUrl', formData)
            .pipe(
                map((response: any) => { // The map operator takes the response and returns it directly.
                    this.toastr.success('File uploaded successfully', 'Success');
                    return response;
                }),
                
            );
    }
}