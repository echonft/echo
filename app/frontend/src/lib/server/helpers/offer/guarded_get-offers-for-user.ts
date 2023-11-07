import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import type { Offer } from '@echo/model/types/offer'

export async function guarded_getOffersForUser(
  username: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints<Offer>
) {
  try {
    return await getOffersForUser(username, filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting offers for user with username ${username} with filters ${JSON.stringify(
        filters
      )} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
