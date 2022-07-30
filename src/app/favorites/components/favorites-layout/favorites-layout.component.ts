import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppSelectors } from 'src/app/ngrx/app.types';
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
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.items$ = this.store.select(AppSelectors.favorites)
    this.metric$ = this.store.select(AppSelectors.isMetric)
  }

}
