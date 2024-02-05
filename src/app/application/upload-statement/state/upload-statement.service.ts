import { Injectable } from "@angular/core"; // allows Angular to inject dependencies into the service.
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' }) 
export class UploadStatementService {
    constructor(private httpClient: HttpClient) {       

    }
    uploadStatement(formData: FormData) {
        return this.httpClient.post('http://localhost:5053/api/upload-statement', formData)
            .pipe(map((response: any) => { return response })); // The map operator takes the response and returns it directly.
    }

}