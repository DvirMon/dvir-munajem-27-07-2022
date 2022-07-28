import { createAction, props } from '@ngrx/store';
import { AutocompleteResult } from '../models/autocomplete-result';
import { CurrentWeatherResult } from '../models/current-weather-result';

export const SetSearchResult = createAction('[SET] Autocomplete search result', props<{ result: Partial<AutocompleteResult[]> }>())



export const SetCurrentWeather = createAction('[SET] Current weather result', props<{ result: CurrentWeatherResult[] }>())
export const SetFutureWeather = createAction('[SET]  Future weather result', props<{ result: CurrentWeatherResult[] }>())


