import { mapNftWithCollection } from './map-nft-with-collection'
import { OfferItemResponse } from '@echo/api'
import { OfferItem } from '@echo/firestore-types'
import { removeUndefinedProps } from '@echo/utils'
import { modify, pipe } from 'ramda'

export function mapOfferItem(item: OfferItem): OfferItemResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(removeUndefinedProps, modify('nft', mapNftWithCollection))(item) as OfferItemResponse
}
