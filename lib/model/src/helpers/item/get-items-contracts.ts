import type { Contract } from '@echo/model/types/contract'
import type { Item } from '@echo/model/types/item'
import { map, path } from 'ramda'

// TODO Fix casting
export function getItemsContracts(offerItems: Item[]): Contract[] {
  return map<Item, Contract | undefined>(path(['nft', 'collection', 'contract']))(offerItems) as unknown as Contract[]
}
