import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-test';


  constructor(
    private http: HttpClient
  ) {



  }

  ngOnInit(): void {
    throw new Error('TEST OF ERROR')

    // this.getData().subscribe()

  }

  public getData(): Observable<any> {
    return this.http.post('http://localhost:3003/api/mail', {})
  }
}
