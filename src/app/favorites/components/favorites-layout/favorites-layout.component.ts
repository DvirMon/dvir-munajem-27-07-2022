import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteCard } from '../favorite-card/favorite-card.component';

import { Store } from '@ngrx/store';
import { AppActions, AppSelectors } from 'src/app/ngrx/app.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites-layout',
  templateUrl: './favorites-layout.component.html',
  styleUrls: ['./favorites-layout.component.scss']
})
export class FavoritesLayoutComponent implements OnInit {

  items$!: Observable<Map<number, FavoriteCard>>
  metric$!: Observable<boolean>

  constructor(
    private router: Router,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.items$ = this.store.select(AppSelectors.favorites);
    this.metric$ = this.store.select(AppSelectors.isMetric);
  }

  private _updateQuery(query: string): void {
    const action = AppActions.UpdateQuery({ data: query });
    this.store.dispatch(action);
  }

  onSelect({ location }: FavoriteCard): void {
    this._updateQuery(location);
    this.router.navigateByUrl('/');
  }
}
