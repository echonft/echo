import { BadRequestError } from '../error/bad-request-error'
import { OfferItemRequest } from '@echo/api-public'
import { findNftById, OfferItem } from '@echo/firestore'
import { NonEmptyArray } from '@echo/utils'
import { isNil, map } from 'ramda'

export const getOfferItems = (itemRequests: NonEmptyArray<OfferItemRequest>) =>
  Promise.all(
    map(async (item) => {
      const { nft, amount } = item
      const foundNft = await findNftById(nft.id)
      if (isNil(foundNft)) {
        throw new BadRequestError()
      }
      return { amount, nft: foundNft } as OfferItem
    }, itemRequests)
  ) as Promise<Awaited<NonEmptyArray<OfferItem>>>
