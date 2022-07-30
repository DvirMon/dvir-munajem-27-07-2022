import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesLayoutComponent } from './components/favorites-layout/favorites-layout.component';
import { FavoriteGuard } from './guards/favorite.guard';

const routes: Routes = [
  {
    path: '', component: FavoritesLayoutComponent,
    canActivate: [FavoriteGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
