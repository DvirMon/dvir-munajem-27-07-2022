import { Component } from '@angular/core';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-test';


  constructor(
    private loggerService: LoggerService
  ) {


    this.loggerService.writeToLocalStorage({ message: 'test' })

  }
}
