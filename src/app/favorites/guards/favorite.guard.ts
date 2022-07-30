import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { AppSelectors } from 'src/app/ngrx/app.types';

@Injectable({
  providedIn: 'root'
})
export class FavoriteGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<any>,
    private toastr : ToastrService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(AppSelectors.hasFavorites).pipe(
      tap((hasFavorites: boolean) =>{

        if(!hasFavorites) {
          this.toastr.show('No Favorites has been selected')
          this.router.navigateByUrl('/')
        }
      }));
  }

}
