import { FavoriteCard } from "../favorites/components/favorite-card/favorite-card.component";
import { AutocompleteResult } from "../utilities/models/autocomplete-result";
import { CurrentWeatherResult } from "../utilities/models/current-weather-result";

export const appFeatureKey = 'app';

export interface AppState {
  searchResult: AutocompleteResult[]
  currentWeather: CurrentWeatherResult[]
  futureWeather: CurrentWeatherResult[]
  favorites: Map<number, FavoriteCard>

}

export const initialAppState: AppState = {
  searchResult: [],
  currentWeather: [],
  futureWeather: [],
  favorites: new Map<number, FavoriteCard>()
};
