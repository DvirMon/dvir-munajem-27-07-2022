import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { WeatherResolver } from './utilities/resolvers/options.resolver';

const routes: Routes = [
  {
    path: '',
    component: LobbyComponent,
    resolve: {
      options: WeatherResolver
    }
  },
  {
    path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then((m) => m.FavoritesModule)
  },
  {
    path: '', redirectTo: 'lobby', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
