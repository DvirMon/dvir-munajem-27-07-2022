import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './app.state';
import { AppActions } from './app.types';

export const appReducer = createReducer(
  initialAppState,
  on(AppActions.SetSearchResult, (state, action) => ({
    ...state,
    searchResult: action.result
  }))
);
