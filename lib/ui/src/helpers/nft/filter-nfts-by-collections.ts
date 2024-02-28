import type { Nft } from '@echo/model/types/nft'
import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { filter, isEmpty, map, path, pipe } from 'ramda'

export function filterNftsByCollections<T extends Nft>(filters: CollectionFilter[], nfts: T[]): T[] {
  if (isEmpty(filters)) {
    return nfts
  }
  const slugs = map<CollectionFilter, string>(nonNullableReturn(path(['collection', 'slug'])), filters)
  return filter(pipe<[T], string, boolean>(nonNullableReturn(path(['collection', 'slug'])), isIn(slugs)), nfts)
}
