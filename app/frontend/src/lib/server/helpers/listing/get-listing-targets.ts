import { ListingTargetRequest } from '@echo/api'
import { findNftCollectionById } from '@echo/firestore'
import type { ListingTarget } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil, map } from 'ramda'

export const getListingTargets = (listingTargetRequests: NonEmptyArray<ListingTargetRequest>) =>
  Promise.all(
    map(async (item) => {
      const { collection, amount } = item
      const foundCollection = await findNftCollectionById(collection.id)
      if (isNil(foundCollection)) {
        throw new BadRequestError(
          `collection with id ${collection.id} not found in firestore while trying to get listing targets`
        )
      }
      return { amount, collection: foundCollection } as ListingTarget
    }, listingTargetRequests)
  ) as Promise<Awaited<NonEmptyArray<ListingTarget>>>
