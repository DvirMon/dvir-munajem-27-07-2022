import { FavoriteCard } from "../favorites/components/favorite-card/favorite-card.component";
import { WeatherResult } from "../shared/components/weather-result/weather-result.component";
import { AutocompleteResult } from "../utilities/models/autocomplete-result";
import { CurrentWeatherResult } from "../utilities/models/current-weather-result";
import { FutureResultObject } from "../utilities/models/future-weather-result";

export const appFeatureKey = 'app';

export interface AppState {
  searchResult: AutocompleteResult[]
  selectedResult: WeatherResult | null
  currentWeather: CurrentWeatherResult | null
  futureWeather: FutureResultObject | null
  favorites: Map<number, FavoriteCard>

}

export const initialAppState: AppState = {
  searchResult: [],
  selectedResult: null,
  currentWeather: null,
  futureWeather: null,
  favorites: new Map<number, FavoriteCard>([
    [226396, { id: 226396, location: 'Tokyo' } as FavoriteCard],
    [106770, { id: 106770, location: 'Taiyuan' } as FavoriteCard]

  ])
};
