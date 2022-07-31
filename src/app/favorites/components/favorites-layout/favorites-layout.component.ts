import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppActions, AppSelectors } from 'src/app/ngrx/app.types';
import { WeatherService } from 'src/app/utilities/services/weather.service';
import { FavoriteCard } from '../favorite-card/favorite-card.component';

@Component({
  selector: 'app-favorites-layout',
  templateUrl: './favorites-layout.component.html',
  styleUrls: ['./favorites-layout.component.scss']
})
export class FavoritesLayoutComponent implements OnInit {

  items$!: Observable<Map<number, FavoriteCard>>
  metric$!: Observable<boolean>

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private store: Store<any>,
  ) { }



  ngOnInit(): void {
    this.items$ = this.store.select(AppSelectors.favorites)
    this.metric$ = this.store.select(AppSelectors.isMetric)
  }

  private _updateQuery(query: string) {
    const action = AppActions.UpdateQuery({ data: query })
    this.store.dispatch(action)
  }

  onSelect({ location }: FavoriteCard) {
    this._updateQuery(location)
    this.router.navigateByUrl('/')
  }
}
