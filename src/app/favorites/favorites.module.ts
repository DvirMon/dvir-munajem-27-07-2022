import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesLayoutComponent } from './components/favorites-layout/favorites-layout.component';
import { SharedModule } from '../shared/shared.module';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';


@NgModule({
  declarations: [
    FavoritesLayoutComponent,
    FavoriteCardComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule
  ]
})
export class FavoritesModule { }
