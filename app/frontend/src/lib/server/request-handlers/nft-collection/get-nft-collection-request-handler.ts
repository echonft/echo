import { assertNftCollection } from '../../helpers/nft-collection/assert-nft-collection'
import { getNftCollectionBySlug } from '../../helpers/nft-collection/get-nft-collection-by-slug'
import { mapNftCollection } from '../../mappers/to-response/map-nft-collection'
import { ApiRequest, GetNftCollectionResponse } from '@echo/api'
import { NextResponse } from 'next/server'

export async function getNftCollectionRequestHandler(_req: ApiRequest<never>, slug: string) {
  const nftCollection = await getNftCollectionBySlug(slug)
  assertNftCollection(nftCollection)
  return NextResponse.json<GetNftCollectionResponse>({ collection: mapNftCollection(nftCollection!) })
}
