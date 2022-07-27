import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesLayoutComponent } from './components/favorites-layout/favorites-layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FavoritesLayoutComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule
  ]
})
export class FavoritesModule { }
