import { parseContraintsQuery } from '../../../helpers/request/parse-contraints-query'
import { mapNftCollection } from '../../mappers/to-response/map-nft-collection'
import { ApiRequest, GetNftCollectionsResponse } from '@echo/api'
import { getAllNftCollections } from '@echo/firestore'
import { NextResponse } from 'next/server'
import { map } from 'ramda'

export async function getAllCollectionsRequestHandler(req: ApiRequest<never>) {
  const constraints = parseContraintsQuery(req)
  const collections = await getAllNftCollections(constraints)
  return NextResponse.json<GetNftCollectionsResponse>({ collections: map(mapNftCollection, collections) })
}
