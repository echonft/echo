import { OfferItem } from '@echo/firestore-types'
import { NonEmptyArray, propIsNil } from '@echo/utils'
import { pathIsNil } from '@echo/utils/src/fp/path-is-nil'
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
