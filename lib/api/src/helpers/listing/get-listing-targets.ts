import { ApiError } from '../error/api-error'
import { ListingTargetRequest } from '@echo/api-public'
import { findNftCollectionById, ListingTarget } from '@echo/firestore'
import { NonEmptyArray } from '@echo/utils'
import { isNil, map } from 'ramda'

export const getListingTargets = (listingTargetRequests: NonEmptyArray<ListingTargetRequest>) =>
  Promise.all(
    map(async (item) => {
      const { collection, amount } = item
      const foundCollection = await findNftCollectionById(collection.id)
      if (isNil(foundCollection)) {
        throw new ApiError(400, 'Invalid body')
      }
      return { amount, collection: foundCollection } as ListingTarget
    }, listingTargetRequests)
  ) as Promise<Awaited<NonEmptyArray<ListingTarget>>>
