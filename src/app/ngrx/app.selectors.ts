import { createFeatureSelector, createSelector } from '@ngrx/store';
import { appFeatureKey, AppState } from './app.state';

export const root = createFeatureSelector<AppState>(appFeatureKey);


export const searchResult = createSelector(root, (state) =>

  state.searchResult)

