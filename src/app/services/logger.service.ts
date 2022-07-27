import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


export interface LogMessage {

  message: string
  stackTrace: string,
  timeStamp: Date
}

export interface LogConfig {
  target?: 'console' | 'storage' | undefined
  formatMessage?: (data?: any) => any
}


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private production: boolean = !environment.production

  constructor() { }

  private setLog(error: Error): LogMessage {
    const timeStamp = new Date()
    const { message, stack } = error
    return { message, stackTrace: stack, timeStamp } as LogMessage
  }

  private writeToConsole(log: LogMessage) {
    if (this.production) {
      console.log('log', log)
    }
  }

  private writeToLocalStorage(log: LogMessage) {
    if (this.production) {
      localStorage.setItem('log', JSON.stringify(log))
    }
  }

  handleBackendError(err: HttpErrorResponse): LogMessage {
    const error = new Error(err.message)
    const { stack, message } = error
    return {
      message,
      stackTrace: stack || 'SERVER ERROR - NO STACK EXIST',
      timeStamp: new Date()
    };
  }

  writeLog(error: Error, config: LogConfig = { formatMessage: this.setLog }): void {

    const { target, formatMessage } = config
    const log = formatMessage ? formatMessage() : this.setLog(error)

    switch (target) {
      case 'storage':
        this.writeToLocalStorage(log)
        break;
      case 'console':
        this.writeToConsole(log)
        break;
      default:
        this.writeToLocalStorage(log)
        this.writeToConsole(log)
    }
  }


}
