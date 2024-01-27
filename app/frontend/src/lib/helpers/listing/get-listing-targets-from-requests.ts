import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { assoc, isNil, map } from 'ramda'

export function getListingTargetsFromRequests(listingTargetRequests: ListingTargetRequest[]) {
  return Promise.all(
    map(async (item) => {
      const { collection } = item
      const foundCollection = await findCollectionBySlug(collection.slug)
      if (isNil(foundCollection)) {
        throw new BadRequestError(
          `collection with slug ${collection.slug} not found in firestore while trying to get listing targets`
        )
      }
      return assoc('collection', foundCollection, item) as ListingTarget
    }, listingTargetRequests)
  )
}
