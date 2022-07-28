import { createFeatureSelector, createSelector } from '@ngrx/store';
import { appFeatureKey, AppState } from './app.state';
import { AutocompleteResult } from '../utilities/models/autocomplete-result';
import { AutocompleteOption } from '../utilities/models/autocomplete-option';
import { WeatherResult } from '../shared/components/weather-result/weather-result.component';

export const root = createFeatureSelector<AppState>(appFeatureKey);


export const searchResult = createSelector(root, (state) =>
  state.searchResult)

export const currentResult = createSelector(root, (state) => {
  const { currentWeather } = state

  const tempData = {
    description: 'cloudy with a chance of meatballs ',
    temp: 30
  }

  return {
    // description: currentWeather?.WeatherText,
    // temp: currentWeather?.WeatherIcon
    ...tempData
  } as Partial<WeatherResult>
})

export const futureResult = createSelector(root, (state) => {

  const { futureWeather } = state

  const tempData = [
    { temp: 30, date: new Date(new Date().setDate(0)) },
    { temp: 30, date: new Date(new Date().setDate(1)) },
    { temp: 30, date: new Date(new Date().setDate(2)) },
    { temp: 30, date: new Date(new Date().setDate(3)) },
    { temp: 30, date: new Date(new Date().setDate(4)) },

  ]

  return {
    forecast: tempData
  } as Partial<WeatherResult>
})


export const favorites = createSelector(root, (state) => state.favorites)

export const isFavorites = createSelector(root, (state) => {

  const selectedResult = state.selectedResult
  const favorites = state.favorites

  if (selectedResult && favorites.size) {
    const { id } = selectedResult


    return favorites.has(id)
  }

  else {
    return false
  }

})

export const weatherResult = createSelector(root, currentResult, futureResult, isFavorites, (state, current: Partial<WeatherResult>, future: Partial<WeatherResult>, favorite: boolean) => {

  return {
    ...state.selectedResult,
    ...current,
    ...future,
    favorite
  } as WeatherResult
})

export const autocompleteOptions = createSelector(searchResult, (state) => state.map((result: AutocompleteResult) => {
  return {
    value: result.LocalizedName,
    key: Number(result.Key)
  } as AutocompleteOption
}))

