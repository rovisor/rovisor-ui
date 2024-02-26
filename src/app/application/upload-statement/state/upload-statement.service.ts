import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { environment } from "src/environments/environment";
@Injectable({ providedIn: 'root' })
export class UploadStatementService {
    constructor(private httpClient: HttpClient) { }

    uploadStatement(formData: FormData) {
        return this.httpClient.post(`${environment.apiUrl}/FileUpload/upload`, formData).pipe(catchError((error: any) => { return throwError(error);}));
    }
}
