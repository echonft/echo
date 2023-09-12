import { OfferItem } from '@echo/firestore-types'
import pathIsNil from '@echo/utils/path-is-nil'
import propIsNil from '@echo/utils/prop-is-nil'
import type { NonEmptyArray } from '@echo/utils/types'
import { forEach, head, path, pipe } from 'ramda'

export function getOfferItemsCollectionId(items: NonEmptyArray<OfferItem>): string {
  forEach((item: OfferItem) => {
    if (
      propIsNil('nft', item) ||
      pathIsNil(['nft', 'collection'], item) ||
      pathIsNil(['nft', 'collection', 'id'], item)
    ) {
      throw Error('not every items have an nft with a collection')
    }
  }, items)
  return pipe(head, path(['nft', 'collection', 'id']))(items) as string
}
