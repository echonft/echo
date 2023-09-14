import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetNftCollectionsResponse } from '@echo/api/types/responses/get-nft-collections-response'
import { getAllCollections } from '@server/helpers/collection/get-all-collections'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { mapCollectionToResponse } from '@server/mappers/to-response/map-collection-to-response'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getAllCollectionsRequestHandler(req: ApiRequest<never>) {
  const constraints = parseConstraintsQuery(req)
  const collections = await getAllCollections(constraints)
  return NextResponse.json<GetNftCollectionsResponse>({ collections: map(mapCollectionToResponse, collections) })
}
