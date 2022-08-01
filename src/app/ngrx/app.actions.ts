import { createAction, props } from '@ngrx/store';
import { FavoriteCard } from '../favorites/components/favorite-card/favorite-card.component';
import { WeatherResult } from '../shared/components/weather-result/weather-result.component';
import { AutocompleteResult } from '../utilities/models/autocomplete-result';
import { CurrentWeatherResult } from '../utilities/models/current-weather-result';
import { FutureResultObject } from '../utilities/models/future-weather-result';

export const SetSearchResult = createAction('[SET] Autocomplete search result', props<{ data: AutocompleteResult[] }>())
export const SetCurrentWeather = createAction('[SET] Current weather result', props<{ data: CurrentWeatherResult, id: number }>())
export const SetFutureWeather = createAction('[SET]  Future weather result', props<{ data: FutureResultObject, id: number }>())

export const SetSelectedResult = createAction('[SET] Selected result', props<{ data: WeatherResult }>())
export const PatchSelectedResult = createAction('[PATCH] Patch Selected result', props<{ data: Partial<WeatherResult> }>())

export const SetFavorite = createAction('[SET]  Add favorite location', props<{ data: FavoriteCard }>())
export const DeleteFavorite = createAction('[CLEAR]  Remove favorite location', props<{ data: FavoriteCard }>())

export const SetDegree = createAction('[SET]  Update Degree Change', props<{ data: boolean }>())

export const UpdateGeolocation = createAction('[UPDATE] geolocation flag value', props<{ data: boolean }>())


