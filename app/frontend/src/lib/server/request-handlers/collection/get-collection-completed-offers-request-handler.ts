import { type ApiRequest } from '@echo/api/types/api-request'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { assertCollection } from '@echo/frontend/lib/server/helpers/collection/assert-collection'
import { getCollectionBySlug } from '@echo/frontend/lib/server/helpers/collection/get-collection-by-slug'
import { getCollectionOffers } from '@echo/frontend/lib/server/helpers/offer/get-collection-offers'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse-offer-filters-query'
import { NextResponse } from 'next/server'
import { assoc, dissoc, pipe } from 'ramda'

export async function getCollectionCompletedOffersRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseOfferFiltersQuery(req)
  const collection = await getCollectionBySlug(slug)
  assertCollection(collection)
  const completedOffersFilters = pipe(
    assoc('states', ['COMPLETED']),
    dissoc('notStates'),
    assoc('includeExpired', true)
  )(filters)
  const offers = await getCollectionOffers(collection.id, completedOffersFilters, constraints)
  return NextResponse.json<OffersResponse>({ offers })
}
