import { getAllNftCollections } from '../../helpers/nft-collection/get-all-nft-collections'
import { parseConstraintsQuery } from '../../helpers/request/parse-constraints-query'
import { mapNftCollection } from '../../mappers/to-response/map-nft-collection'
import { ApiRequest, GetNftCollectionsResponse } from '@echo/api'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getAllCollectionsRequestHandler(req: ApiRequest<never>) {
  const constraints = parseConstraintsQuery(req)
  const collections = await getAllNftCollections(constraints)
  return NextResponse.json<GetNftCollectionsResponse>({ collections: map(mapNftCollection, collections) })
}
