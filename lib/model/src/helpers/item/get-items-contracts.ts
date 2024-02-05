import type { Contract } from '@echo/model/types/contract'
import type { Item } from '@echo/model/types/item'
import type { Nullable } from '@echo/utils/types/nullable'
import { map, path } from 'ramda'

// TODO Fix casting
export function getItemsContracts(offerItems: Item[]): Contract[] {
  return map<Item, Nullable<Contract>>(path(['nft', 'collection', 'contract']))(offerItems) as unknown as Contract[]
}
