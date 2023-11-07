import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { assoc, isNil, map } from 'ramda'

export function getListingTargetsFromRequests(listingTargetRequests: ListingTargetRequest[]) {
  return Promise.all(
    map(async (item) => {
      const { collection } = item
      const foundCollection = await findCollectionById(collection.id)
      if (isNil(foundCollection)) {
        throw new BadRequestError(
          `collection with id ${collection.id} not found in firestore while trying to get listing targets`
        )
      }
      return assoc('collection', foundCollection, item) as ListingTarget
    }, listingTargetRequests)
  )
}
