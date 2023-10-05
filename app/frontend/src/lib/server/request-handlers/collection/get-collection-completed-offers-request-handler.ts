import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetOffersResponse } from '@echo/api/types/responses/get-offers-response'
import { assertCollection } from '@server/helpers/collection/assert-collection'
import { getCollectionBySlug } from '@server/helpers/collection/get-collection-by-slug'
import { getCollectionOffers } from '@server/helpers/offer/get-collection-offers'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '@server/helpers/request/parse-offer-filters-query'
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
  return NextResponse.json<GetOffersResponse>({ offers })
}
