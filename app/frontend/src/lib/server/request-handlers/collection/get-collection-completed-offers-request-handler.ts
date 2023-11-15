import { type ApiRequest } from '@echo/api/types/api-request'
import { type OffersResponse } from '@echo/api/types/responses/offers-response'
import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getOffersForCollection } from '@echo/firestore/crud/offer/get-offers-for-collection'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guarded_assertCollectionExists } from '@echo/frontend/lib/server/helpers/collection/assert/guarded_assert-collection-exists'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { parseOfferFiltersQuery } from '@echo/frontend/lib/server/helpers/request/parse_offer_filters_query'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { NextResponse } from 'next/server'
import { assoc, dissoc, pipe } from 'ramda'

export async function getCollectionCompletedOffersRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = guardFn(parseConstraintsQuery, ErrorStatus.BAD_REQUEST)(req)
  const filters = guardFn(parseOfferFiltersQuery, ErrorStatus.BAD_REQUEST)(req)
  const collection = await guardAsyncFn(findCollectionBySlug, ErrorStatus.SERVER_ERROR)(slug)
  guarded_assertCollectionExists(collection, slug)
  const completedOffersFilters = pipe(
    assoc('states', [OFFER_STATE_COMPLETED]),
    dissoc('notStates'),
    assoc('includeExpired', true)
  )(filters)
  const offers = await guardAsyncFn(getOffersForCollection, ErrorStatus.SERVER_ERROR)(
    collection.id,
    completedOffersFilters,
    constraints
  )
  return NextResponse.json<OffersResponse>({ offers })
}
