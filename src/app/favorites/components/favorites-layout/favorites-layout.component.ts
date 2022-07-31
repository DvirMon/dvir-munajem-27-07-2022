import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteCard } from '../favorite-card/favorite-card.component';

import { Store } from '@ngrx/store';
import { AppActions, AppSelectors } from 'src/app/ngrx/app.types';
import { Observable } from 'rxjs';
import { WeatherResult } from 'src/app/shared/components/weather-result/weather-result.component';

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

  private _updateQuery(id: number, location: string): void {
    const action = AppActions.PatchSelectedResult({ data: { id, location } as Partial<WeatherResult> });
    this.store.dispatch(action);
  }

  onSelect({ location, id }: FavoriteCard): void {
    this._updateQuery(id, location);
    this.router.navigateByUrl('/');
  }
}
