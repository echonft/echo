import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetNftCollectionsResponse } from '@echo/api/types/responses/get-nft-collections-response'
import { getAllNftCollections } from '@server/helpers/nft-collection/get-all-nft-collections'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { mapNftCollection } from '@server/mappers/to-response/map-nft-collection'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getAllCollectionsRequestHandler(req: ApiRequest<never>) {
  const constraints = parseConstraintsQuery(req)
  const collections = await getAllNftCollections(constraints)
  return NextResponse.json<GetNftCollectionsResponse>({ collections: map(mapNftCollection, collections) })
}
