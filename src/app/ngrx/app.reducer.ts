import { createReducer, on } from '@ngrx/store';
import { deleteFavorites, setFavorites, setSelectedResult } from './app.helpers';
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


  on(AppActions.SetCurrentWeather, (state, action) => ({
    ...state,
    currentWeather: { ...action.data }
  })),

  on(AppActions.SetFutureWeather, (state, action) => ({
    ...state,
    futureWeather: action.data
  })),



  on(AppActions.SetFavorite, (state, action) => ({
    ...state,
    favorites: new Map(setFavorites(state.favorites, action.data))
  })),

  on(AppActions.DeleteFavorite, (state, action) => ({
    ...state,
    favorites: deleteFavorites(state.favorites, action.data.id!)
  })),

  on(AppActions.SetDegree, (state, action) => ({
    ...state,
    metric: action.data
  }))
);
