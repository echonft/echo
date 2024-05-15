import type { Contract } from '@echo/model/types/collection'
import type { Item } from '@echo/model/types/item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { map, path } from 'ramda'

export function getItemsContracts(offerItems: Item[]): Contract[] {
  return map<Item, Contract>(nonNullableReturn(path(['nft', 'collection', 'contract'])), offerItems)
}
