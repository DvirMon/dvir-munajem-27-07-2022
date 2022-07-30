import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppSelectors } from 'src/app/ngrx/app.types';

@Injectable({
  providedIn: 'root'
})
export class FavoriteGuard implements CanActivate {

  constructor(
    private store: Store<any>
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(AppSelectors.hasFavorites);
  }

}
