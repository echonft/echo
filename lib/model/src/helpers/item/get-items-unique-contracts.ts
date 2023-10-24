import type { Contract } from '@echo/model/types/contract'
import type { Item } from '@echo/model/types/item'
import { isNil, map, path, pipe, reject, uniq } from 'ramda'

export function getItemsUniqueContracts(offerItems: Item[]): Contract[] {
  return pipe(
    map<Item, Contract | undefined>(path(['nft', 'collection', 'contract'])),
    reject(isNil),
    uniq<Contract>
  )(offerItems)
}
