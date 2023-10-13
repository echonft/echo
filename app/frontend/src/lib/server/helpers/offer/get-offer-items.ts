import type { OfferItemRequest } from '@echo/api/types/requests/offer-item-request'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { getNftById } from '@server/helpers/nft/get-nft-by-id'
import { isNil, map } from 'ramda'

export function getOfferItems(itemRequests: NonEmptyArray<OfferItemRequest>) {
  return Promise.all(
    map(async (item) => {
      const { nft, amount } = item
      const foundNft = await getNftById(nft.id)
      if (isNil(foundNft)) {
        throw new BadRequestError(`nft with id ${nft.id} not found in firestore while trying to get offer items`)
      }
      return { amount, nft: foundNft } as OfferItem
    }, itemRequests)
  ) as Promise<Awaited<NonEmptyArray<OfferItem>>>
}
