import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  private spinnerService: SpinnerService = inject(SpinnerService)

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {


    this.spinnerService.show()

    return next.handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.hide()
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          this.spinnerService.hide()
          return throwError(() => error);
        })
      );

  }


}
