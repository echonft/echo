import { ApiError } from '../api-error'
import { OfferItemRequest } from '@echo/api-public'
import { findNftById, OfferItem } from '@echo/firestore'
import { NonEmptyArray } from '@echo/utils'
import { isNil, map } from 'ramda'

export const getOfferItems = (itemRequests: NonEmptyArray<OfferItemRequest>) =>
  Promise.all(
    map(async (item) => {
      const { id, amount } = item
      const nft = await findNftById(id)
      if (isNil(nft)) {
        throw new ApiError(400, 'Invalid body')
      }
      return { amount, ...nft } as OfferItem
    }, itemRequests)
  ) as Promise<Awaited<NonEmptyArray<OfferItem>>>
