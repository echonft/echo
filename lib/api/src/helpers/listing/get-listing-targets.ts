import { ApiError } from '../api-error'
import { ListingTargetRequest } from '@echo/api-public'
import { findNftCollectionById, ListingTarget } from '@echo/firestore'
import { NonEmptyArray } from '@echo/utils'
import { isNil, map } from 'ramda'

export const getListingTargets = (listingTargetRequests: NonEmptyArray<ListingTargetRequest>) =>
  Promise.all(
    map(async (item) => {
      const { id, amount } = item
      const collection = await findNftCollectionById(id)
      if (isNil(collection)) {
        throw new ApiError(400, 'Invalid body')
      }
      return { amount, collection } as ListingTarget
    }, listingTargetRequests)
  ) as Promise<Awaited<NonEmptyArray<ListingTarget>>>
