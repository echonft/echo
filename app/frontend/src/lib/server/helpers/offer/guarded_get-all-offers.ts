import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import type { Offer } from '@echo/model/types/offer'

export async function guarded_getAllOffers(filters?: OfferQueryFilters, constraints?: QueryConstraints<Offer>) {
  try {
    return await getAllOffers(filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting all offers with filters ${JSON.stringify(filters)} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
