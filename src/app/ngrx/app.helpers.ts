import { AutocompleteResult } from "../models/autocomplete-result";


export function findResult<T>(items: T[], key: keyof T, value: any) {
  return items.find((item: any) => item[key].toLowerCase().includes(value.toLowerCase()));
}

export function mapSearchToOption (items : AutocompleteResult[]) {
  return 
}

