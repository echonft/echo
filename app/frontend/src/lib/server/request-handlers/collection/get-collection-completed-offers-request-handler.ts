import { type ApiRequest } from '@echo/api/types/api-request'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { guarded_assertCollectionExists } from '@echo/frontend/lib/server/helpers/collection/assert/guarded_assert-collection-exists'
import { guarded_findCollectionBySlug } from '@echo/frontend/lib/server/helpers/collection/guarded_find-collection-by-slug'
import { guarded_getOffersForCollection } from '@echo/frontend/lib/server/helpers/offer/guarded_get-offers-for-collection'
import { guarded_parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-constraints-query'
import { guarded_parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-offer-filters-query'
import { NextResponse } from 'next/server'
import { assoc, dissoc, pipe } from 'ramda'

export async function getCollectionCompletedOffersRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = guarded_parseConstraintsQuery(req)
  const filters = guarded_parseOfferFiltersQuery(req)
  const collection = await guarded_findCollectionBySlug(slug)
  guarded_assertCollectionExists(collection, slug)
  const completedOffersFilters = pipe(
    assoc('states', ['COMPLETED']),
    dissoc('notStates'),
    assoc('includeExpired', true)
  )(filters)
  const offers = await guarded_getOffersForCollection(collection.id, completedOffersFilters, constraints)
  return NextResponse.json<OffersResponse>({ offers })
}
