import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService implements ErrorHandler {


  constructor(@Inject(Injector) private injector: Injector) { }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  //  handleError(error: any): void {
  //     this.toastrService.error('Show me an error message');
  //     throw error;
  // }


  handleError(error: any) {

    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      console.error('Custom Error Handler:', error.error.message || 'An unexpected error ocurred')
    } else {
      errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
      this.toastrService.error(error.message, 'An unexpected error ocurred');
    }

  }
}
