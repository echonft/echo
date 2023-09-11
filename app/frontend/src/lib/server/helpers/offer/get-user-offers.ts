import { getOffersForReceiver, getOffersForSender } from '@echo/firestore'
import { getOffersForUser } from '@echo/firestore/src/crud/offer/get-offers-for-user'
import type { OfferQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { OfferFilterAsReceiver } from '@echo/firestore-types'
import { ServerError } from '@server/helpers/error/server-error'
import { isNil } from 'ramda'

export async function getUserOffers(userId: string, filters?: OfferQueryFilters, constraints?: QueryConstraints) {
  try {
    if (!isNil(filters) && !isNil(filters.as)) {
      const { as } = filters
      if (as === OfferFilterAsReceiver) {
        return await getOffersForReceiver(userId, filters, constraints)
      } else {
        return await getOffersForSender(userId, filters, constraints)
      }
    } else {
      return await getOffersForUser(userId, filters, constraints)
    }
  } catch (e) {
    throw new ServerError(
      `error getting offers for user with id ${userId} with filters ${JSON.stringify(
        filters
      )} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
