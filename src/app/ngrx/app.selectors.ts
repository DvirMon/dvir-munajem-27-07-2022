import { createFeatureSelector, createSelector } from '@ngrx/store';
import { appFeatureKey, AppState } from './app.state';
import { AutocompleteResult } from '../utilities/models/autocomplete-result';
import { AutocompleteOption } from '../utilities/models/autocomplete-option';
import { Observable } from 'rxjs';

export const root = createFeatureSelector<AppState>(appFeatureKey);


export const searchResult = createSelector(root, (state) =>

  state.searchResult)

export const currentResult = createSelector(root, (state) =>

  state.currentWeather)

export const futureResult = createSelector(root, (state) =>

  state.futureWeather)

export const weatherResult = createSelector(root, (state) => { return null })

export const autocompleteOptions  = createSelector(searchResult, (state) => state.map((result: AutocompleteResult) => {
  return {
    value: result.LocalizedName,
    key: Number(result.Key)
  }
}))
