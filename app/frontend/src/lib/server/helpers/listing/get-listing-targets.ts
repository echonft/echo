import type { ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { findNftCollectionById } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-id'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil, map } from 'ramda'

export function getListingTargets(listingTargetRequests: NonEmptyArray<ListingTargetRequest>) {
  return Promise.all(
    map(async (item) => {
      const { collection, amount } = item
      const foundCollection = await findNftCollectionById(collection.id)
      if (isNil(foundCollection)) {
        throw new BadRequestError(
          `collection with id ${collection.id} not found in firestore while trying to get listing targets`
        )
      }
      return { amount, collection: foundCollection } as FirestoreListingTarget
    }, listingTargetRequests)
  ) as Promise<Awaited<NonEmptyArray<FirestoreListingTarget>>>
}
