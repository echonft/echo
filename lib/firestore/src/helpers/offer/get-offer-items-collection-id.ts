import { OfferItem } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'
import { head, path, pipe } from 'ramda'

export const getOfferItemsCollectionId = (items: NonEmptyArray<OfferItem>): string =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(head, path(['nft', 'collection', 'id']))(items)
