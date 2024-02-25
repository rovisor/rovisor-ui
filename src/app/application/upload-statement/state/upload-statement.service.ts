import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class UploadStatementService {
    constructor(private httpClient: HttpClient) { }

    uploadStatement(formData: FormData) {
        const apiUrl = "http://localhost:5053/api/FileUpload/upload"
        return this.httpClient.post(apiUrl, formData).pipe(catchError((error: any) => { return throwError(error);}));
    }
}
