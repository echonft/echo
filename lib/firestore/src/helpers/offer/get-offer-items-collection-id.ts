import type { FirestoreOfferItem } from '@echo/firestore/types/model/firestore-offer-item'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { forEach, head, path, pipe } from 'ramda'

export function getOfferItemsCollectionId(items: NonEmptyArray<FirestoreOfferItem>): string {
  forEach((item: FirestoreOfferItem) => {
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
