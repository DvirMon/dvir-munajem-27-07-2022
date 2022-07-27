import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesLayoutComponent } from './components/favorites-layout/favorites-layout.component';

const routes: Routes = [
  {
    path: '', component: FavoritesLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
