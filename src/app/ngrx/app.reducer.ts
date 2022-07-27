import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './app.state';
import { AppActions } from './app.types';

export const appReducer = createReducer(
  initialAppState,
  on(AppActions.SetSearchResult, (state, action) => ({
    ...state,
    searchResult: action.result
  })),
  on(AppActions.SetCurrentWeather, (state, action) => ({
    ...state,
    currentWeather : action.result
  })),
  on(AppActions.SetFutureWeather, (state, action) => ({
    ...state,
    futureWeather: action.result
  })),
);
