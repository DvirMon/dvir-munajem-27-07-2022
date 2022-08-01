import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService implements ErrorHandler {


  constructor(private router: Router, @Inject(Injector) private injector: Injector) { }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }
  private _setMessage(error: HttpErrorResponse): string {

    let message = '';
    if (error.status) {
      message = `Error Code: ${error.status},  Message: ${error.message || error.error.message}`;
    } else {
      message = 'An unexpected error ocurred'
    }

    return message

  }

  handleError(error: any) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      console.error('Custom Error Handler:', error.error.message || 'An unexpected error ocurred')
    } else {
      errorMsg = this._setMessage(error as HttpErrorResponse)
      sessionStorage.setItem('errorMessage', errorMsg)
      this.toastrService.error(error.message, errorMsg);
      this.router.navigate(['error'])
    }

  }
}

