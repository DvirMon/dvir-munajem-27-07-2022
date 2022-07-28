import { createAction, props } from '@ngrx/store';
import { AutocompleteResult } from '../utilities/models/autocomplete-result';
import { CurrentWeatherResult } from '../utilities/models/current-weather-result';

export const SetSearchResult = createAction('[SET] Autocomplete search result', props<{ result: AutocompleteResult[] }>())



export const SetCurrentWeather = createAction('[SET] Current weather result', props<{ result: CurrentWeatherResult[] }>())
export const SetFutureWeather = createAction('[SET]  Future weather result', props<{ result: CurrentWeatherResult[] }>())


