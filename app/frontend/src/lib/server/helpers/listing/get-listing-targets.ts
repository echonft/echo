import type { ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import type { ListingTarget } from '@echo/model/types/listing-target'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil, map } from 'ramda'

export function getListingTargets(listingTargetRequests: NonEmptyArray<ListingTargetRequest>) {
  return Promise.all(
    map(async (item) => {
      const { collection, amount } = item
      const foundCollection = await findCollectionById(collection.id)
      if (isNil(foundCollection)) {
        throw new BadRequestError(
          `collection with id ${collection.id} not found in firestore while trying to get listing targets`
        )
      }
      return { amount, collection: foundCollection } as ListingTarget
    }, listingTargetRequests)
  ) as Promise<Awaited<NonEmptyArray<ListingTarget>>>
}
