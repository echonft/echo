import { BadRequestError } from '../error/bad-request-error'
import { getNftById } from '../nft/get-nft-by-id'
import { OfferItemRequest } from '@echo/api'
import { OfferItem } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'
import { isNil, map } from 'ramda'

export const getOfferItems = (itemRequests: NonEmptyArray<OfferItemRequest>) =>
  Promise.all(
    map(async (item) => {
      const { nft, amount } = item
      const foundNft = await getNftById(nft.id)
      if (isNil(foundNft)) {
        throw new BadRequestError(`nft with id ${nft.id} not found in firestore while trying to get offer items`)
      }
      return { amount, nft: foundNft } as OfferItem
    }, itemRequests)
  ) as Promise<Awaited<NonEmptyArray<OfferItem>>>
