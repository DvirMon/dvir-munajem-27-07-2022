import { Injectable } from '@angular/core';


export interface LogMessage {

  message: string
  stackTrace: string,
  timeStamp: Date
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  setLog(message: string, error: any): LogMessage {
    const timeStamp = new Date()
    return { message, stackTrace: error, timeStamp } as LogMessage
  }

  writeToConsole(log: Partial<LogMessage>) {
    console.log('log', log)
  }

  writeToLocalStorage(log: Partial<LogMessage>) {
    localStorage.setItem('log', JSON.stringify(log))
  }
}
