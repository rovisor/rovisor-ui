import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({providedIn:"root"}) 
export class HandleErrorService {
    constructor(private toastr: ToastrService) {

    }
    public handleError(err: HttpErrorResponse) {
        let errorMessage : string;
        if(err.error instanceof ErrorEvent) {
            errorMessage = `An error occured : ${err.error.message}`;
        } else {
            errorMessage = 'Something went wrong.'
        }
        this.toastr.error(errorMessage);
    }
}