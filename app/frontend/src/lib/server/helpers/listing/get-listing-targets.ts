import { BadRequestError } from '../error/bad-request-error'
import { ListingTargetRequest } from '@echo/api'
import { findNftCollectionById } from '@echo/firestore'
import { ListingTarget } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'
import { isNil, map } from 'ramda'

export const getListingTargets = (listingTargetRequests: NonEmptyArray<ListingTargetRequest>) =>
  Promise.all(
    map(async (item) => {
      const { collection, amount } = item
      const foundCollection = await findNftCollectionById(collection.id)
      if (isNil(foundCollection)) {
        throw new BadRequestError()
      }
      return { amount, collection: foundCollection } as ListingTarget
    }, listingTargetRequests)
  ) as Promise<Awaited<NonEmptyArray<ListingTarget>>>
