import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoggerService, LogMessage } from '../services/logger.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {


  loggerService: LoggerService = inject(LoggerService)



  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const log: LogMessage = this.loggerService.handleBackendError(err)
        return throwError(() => log);
      })
    );
  }



}
