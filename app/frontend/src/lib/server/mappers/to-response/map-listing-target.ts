import { mapNftCollection } from './map-nft-collection'
import { ListingTargetResponse } from '@echo/api'
import { ListingTarget } from '@echo/firestore-types'
import { removeUndefinedProps } from '@echo/utils'
import { modify, pipe } from 'ramda'

export function mapListingTarget(target: ListingTarget): ListingTargetResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(removeUndefinedProps, modify('collection', mapNftCollection))(target) as ListingTargetResponse
}
