import { createReducer, on } from '@ngrx/store';
import { deleteFavorites, setFavorites, setMapItems, setSelectedResult } from './app.helpers';
import { initialAppState } from './app.state';
import { AppActions } from './app.types';

export const appReducer = createReducer(
  initialAppState,
  on(AppActions.SetSearchResult, (state, action) => ({
    ...state,
    searchResult: action.data
  })),

  on(AppActions.SetSelectedResult, (state, action) => ({
    ...state,
    selectedResult: action.data
  })),
  on(AppActions.PatchSelectedResult, (state, action) => ({
    ...state,
    selectedResult: {
      ...state.selectedResult,
      ...action.data
    }
  })),

  on(AppActions.SetCurrentWeather, (state, action) => ({
    ...state,
    currentWeatherResults: {
      ...state.currentWeatherResults,
      [action.id]: action.data
    }
  })),

  on(AppActions.SetFutureWeather, (state, action) => ({
    ...state,
    futureWeatherResults: {
      ...state.futureWeatherResults,
      [action.id]: action.data
    }
  })),


  on(AppActions.SetFavorite, (state, action) => ({
    ...state,
    favorites: new Map(setFavorites(state.favorites, action.data))
  })),

  on(AppActions.DeleteFavorite, (state, action) => ({
    ...state,
    favorites: deleteFavorites(state.favorites, action.data.id!)
  })),

  on(AppActions.SetunitTemp, (state, action) => ({
    ...state,
    metric: action.data
  })),

  on(AppActions.UpdateGeolocation, (state, action) => ({
    ...state,
    geolocation: action.data
  }))
);
