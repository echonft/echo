import { ServerError } from '../error/server-error'
import { getOffersForReceiver, getOffersForSender } from '@echo/firestore'
import { getOffersForUser } from '@echo/firestore/src/crud/offer/get-offers-for-user'
import { OfferQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { isNil } from 'ramda'

export async function getUserOffers(userId: string, filters?: OfferQueryFilters, constraints?: QueryConstraints) {
  try {
    if (!isNil(filters) && !isNil(filters.as)) {
      const { as } = filters
      if (as === 'sender') {
        return await getOffersForSender(userId, filters, constraints)
      } else {
        return await getOffersForReceiver(userId, filters, constraints)
      }
    } else {
      return await getOffersForUser(userId, filters, constraints)
    }
  } catch (e) {
    throw new ServerError()
  }
}
