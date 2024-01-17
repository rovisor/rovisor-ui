import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { HandleErrorService } from "../services/handle-error.service";

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
    constructor(private errorService: HandleErrorService) {}

    public intercept(req: HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(map(res => {return res;}), catchError((error: HttpErrorResponse) => {
                this.errorService.handleError(error);
                return of();
            }))
    }
}