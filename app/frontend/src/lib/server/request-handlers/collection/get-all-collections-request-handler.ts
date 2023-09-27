import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetCollectionsResponse } from '@echo/api/types/responses/get-collections-response'
import { getAllCollections } from '@server/helpers/collection/get-all-collections'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { mapCollectionToResponse } from '@server/mappers/to-response/map-collection-to-response'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getAllCollectionsRequestHandler(req: ApiRequest<never>) {
  const constraints = parseConstraintsQuery(req)
  // const filters = parseCollectionFiltersQuery(req)
  const collections = await getAllCollections(constraints)
  return NextResponse.json<GetCollectionsResponse>({ collections: map(mapCollectionToResponse, collections) })
}
