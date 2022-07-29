import { FavoriteCard } from "../favorites/components/favorite-card/favorite-card.component";
import { WeatherResult } from "../shared/components/weather-result/weather-result.component";
import { AutocompleteResult } from "../utilities/models/autocomplete-result";
import { CurrentWeatherResult } from "../utilities/models/current-weather-result";
import { FutureResultObject } from "../utilities/models/future-weather-result";

export const appFeatureKey = 'app';

export interface AppState {
  searchResult: AutocompleteResult[]
  selectedResult: WeatherResult | null
  currentWeather: CurrentWeatherResult
  futureWeather: FutureResultObject | null
  favorites: Map<number, FavoriteCard>
  metric : boolean

}

export const initialAppState: AppState = {
  searchResult: [],
  selectedResult: null,
  currentWeather: {} as CurrentWeatherResult,
  futureWeather: null,
  favorites: new Map<number, FavoriteCard>(),
  metric: true
};
