import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetOffersResponse } from '@echo/api/types/responses/get-offers-response'
import { assertNftCollection } from '@server/helpers/nft-collection/assert-nft-collection'
import { getNftCollectionBySlug } from '@server/helpers/nft-collection/get-nft-collection-by-slug'
import { getNftCollectionOffers } from '@server/helpers/offer/get-nft-collection-offers'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '@server/helpers/request/parse-offer-filters-query'
import { mapOffer } from '@server/mappers/to-response/map-offer'
import { NextResponse } from 'next/server'
import { assoc, dissoc, map, pipe } from 'ramda'

export async function getNftCollectionCompletedOffersRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseOfferFiltersQuery(req)
  const collection = await getNftCollectionBySlug(slug)
  assertNftCollection(collection)
  const completedOffersFilters = pipe(
    assoc('states', ['COMPLETED']),
    dissoc('notStates'),
    assoc('includeExpired', true)
  )(filters)
  const results = await getNftCollectionOffers(collection.id, completedOffersFilters, constraints)
  return NextResponse.json<GetOffersResponse>({ offers: map(mapOffer, results) })
}
