import { getAllOffers as firestoreGetAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@server/helpers/error/server-error'

export async function getAllOffers(filters?: OfferQueryFilters, constraints?: QueryConstraints) {
  try {
    return await firestoreGetAllOffers(filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting all offers with filters ${JSON.stringify(filters)} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
