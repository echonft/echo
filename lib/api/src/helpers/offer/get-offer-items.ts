import { ApiError } from '../api-error'
import { OfferItemRequest } from '@echo/api-public'
import { findNftById, OfferItem } from '@echo/firestore'
import { map } from 'ramda'

export const getOfferItems = (itemRequests: OfferItemRequest[], errorStatus: number, errorMessage: string) => {
  try {
    return Promise.all(
      map(async (item) => {
        const { id, amount } = item
        const nft = await findNftById(id)
        return { amount, ...nft } as OfferItem
      }, itemRequests)
    )
  } catch (e) {
    throw new ApiError(errorStatus, errorMessage)
  }
}
