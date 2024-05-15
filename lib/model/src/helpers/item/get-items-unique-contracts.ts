import type { Contract } from '@echo/model/types/collection'
import type { Item } from '@echo/model/types/item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { map, path, pipe, uniq } from 'ramda'

export function getItemsUniqueContracts(offerItems: Item[]): Contract[] {
  return pipe<[Item[]], Contract[], Contract[]>(
    map(nonNullableReturn(path(['nft', 'collection', 'contract']))),
    uniq<Contract>
  )(offerItems)
}
