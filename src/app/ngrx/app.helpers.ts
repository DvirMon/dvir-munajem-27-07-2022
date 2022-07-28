import { FavoriteCard } from "../favorites/components/favorite-card/favorite-card.component";
import { AutocompleteResult } from "../utilities/models/autocomplete-result";


export function findResult<T>(items: T[], key: keyof T, value: any) {
  return items.find((item: any) => item[key].toLowerCase().includes(value.toLowerCase()));
}

export function mapSearchToOption(items: AutocompleteResult[]) {
  return
}

export function deleteFavorites(items: Map<number, FavoriteCard>, id: number) {
  items.delete(id)
  return items
}
export function setFavorites(items: Map<number, FavoriteCard>, item: FavoriteCard) {

  const updateItems = new Map<number, FavoriteCard>(items);


  console.log(updateItems)
  console.log(item)

  updateItems.set(item.id, item)
  console.log(updateItems)
  return updateItems
}



