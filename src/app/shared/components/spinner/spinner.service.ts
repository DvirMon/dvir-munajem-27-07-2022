import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _showSource$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor() { }

  show() {
    this._showSource$.next(true)
  }

  hide() {
    this._showSource$.next(false)
  }

  listenToShow() {
    return this._showSource$.asObservable()
  }
}
