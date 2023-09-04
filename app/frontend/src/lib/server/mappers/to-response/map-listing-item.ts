import { mapNftWithCollection } from './map-nft-with-collection'
import { ListingItemResponse } from '@echo/api'
import { ListingItem } from '@echo/firestore-types'
import { removeUndefinedProps } from '@echo/utils'
import { modify, pipe } from 'ramda'

export function mapListingItem(item: ListingItem): ListingItemResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(removeUndefinedProps, modify('nft', mapNftWithCollection))(item) as ListingItemResponse
}
