import { AutocompleteResult } from "../models/autocomplete-result";
import { CurrentWeatherResult } from "../models/current-weather-result";

export const appFeatureKey = 'app';

export interface AppState {
  searchResult: AutocompleteResult[]
  currentWeather: CurrentWeatherResult[]
  futureWeather: CurrentWeatherResult[]

}

export const initialAppState: AppState = {
  searchResult: [],
  currentWeather: [],
  futureWeather: []
};
