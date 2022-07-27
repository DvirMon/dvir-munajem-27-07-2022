import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  constructor(
  ) { }


  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      return;
    } else {

      console.error('Error Handler', error.message)
    }

  }
}
