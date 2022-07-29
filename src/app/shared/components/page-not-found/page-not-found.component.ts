import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  defaultMessage: string = 'Page not Found!'
  message! : string
  constructor() { }

  ngOnInit(): void {

    const message = sessionStorage.getItem('errorMessage')
    this.message = message || this.defaultMessage
    sessionStorage.clear()

  }

}
