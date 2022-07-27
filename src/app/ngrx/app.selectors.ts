import { createFeatureSelector, createSelector } from '@ngrx/store';
import { appFeatureKey, AppState } from './app.state';

export const root = createFeatureSelector<AppState>(appFeatureKey);


export const searchResult = createSelector(root, (state) =>

  state.searchResult)

export const currentResult = createSelector(root, (state) =>

  state.currentWeather)

export const futureResult = createSelector(root, (state) =>

  state.futureWeather)

export const weatherResult = createSelector(root, (state) => { return null })

