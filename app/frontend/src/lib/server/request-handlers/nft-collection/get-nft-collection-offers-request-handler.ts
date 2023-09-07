import { getNftCollectionOffers } from '../../helpers/listing/get-nft-collection-offers'
import { assertNftCollection } from '../../helpers/nft-collection/assert-nft-collection'
import { getNftCollectionBySlug } from '../../helpers/nft-collection/get-nft-collection-by-slug'
import { parseConstraintsQuery } from '../../helpers/request/parse-constraints-query'
import { parseOfferFiltersQuery } from '../../helpers/request/parse-offer-filters-query'
import { mapOffer } from '../../mappers/to-response/map-offer'
import { ApiRequest, GetOffersResponse } from '@echo/api'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getNftCollectionOffersRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = parseConstraintsQuery(req)
  const filters = parseOfferFiltersQuery(req)
  const collection = await getNftCollectionBySlug(slug)
  assertNftCollection(collection)
  const results = await getNftCollectionOffers(collection.id, constraints, filters)
  return NextResponse.json<GetOffersResponse>({ offers: map(mapOffer, results) })
}
