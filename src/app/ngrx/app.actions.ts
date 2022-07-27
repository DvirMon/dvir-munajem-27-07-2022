import { createAction, props } from '@ngrx/store';
import { AutocompleteResult } from '../models/autocomplete-result';

export const SetSearchResult = createAction('[SET] Autocomplete search result', props<{ result: AutocompleteResult[] }>())


