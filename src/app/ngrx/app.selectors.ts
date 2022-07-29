import { createFeatureSelector, createSelector } from '@ngrx/store';
import { appFeatureKey, AppState } from './app.state';
import { AutocompleteResult } from '../utilities/models/autocomplete-result';
import { AutocompleteOption } from '../utilities/models/autocomplete-option';
import { WeatherResult } from '../shared/components/weather-result/weather-result.component';
import { mapForecast } from './app.helpers';

export const root = createFeatureSelector<AppState>(appFeatureKey);


export const searchResult = createSelector(root, (state) =>
  state.searchResult)

export const currentWeatherResult = createSelector(root, (state) =>
  state.currentWeather)

export const futureWeatherResult = createSelector(root, (state) =>
  state.futureWeather)

export const currentResult = createSelector(root, (state) => {
  const { currentWeather } = state

  return {
    description: currentWeather?.WeatherText,
    temp: currentWeather?.Temperature
  } as Partial<WeatherResult>
})

export const futureResult = createSelector(root, (state) => {

  const { futureWeather } = state

  const forecast = mapForecast(futureWeather?.DailyForecasts!)

  return {
    forecast
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
    value: result,
    key: Number(result.Key)
  } as AutocompleteOption
}))

