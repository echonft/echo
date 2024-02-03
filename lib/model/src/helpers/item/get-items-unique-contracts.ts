import type { Contract } from '@echo/model/types/contract'
import type { Item } from '@echo/model/types/item'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, map, path, pipe, reject, uniq } from 'ramda'

export function getItemsUniqueContracts(offerItems: Item[]): Contract[] {
  return pipe(
    map<Item, Nullable<Contract>>(path(['nft', 'collection', 'contract'])),
    reject(isNil),
    uniq<Contract>
  )(offerItems)
}
