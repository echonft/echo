import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetNftCollectionResponse } from '@echo/api/types/responses/get-nft-collection-response'
import { assertNftCollectionExists } from '@server/helpers/nft-collection/assert-nft-collection-exists'
import { getNftCollectionBySlug } from '@server/helpers/nft-collection/get-nft-collection-by-slug'
import { mapNftCollection } from '@server/mappers/to-response/map-nft-collection'
import { NextResponse } from 'next/server'

export async function getNftCollectionRequestHandler(_req: ApiRequest<never>, slug: string) {
  const nftCollection = await getNftCollectionBySlug(slug)
  assertNftCollectionExists(slug, nftCollection)
  return NextResponse.json<GetNftCollectionResponse>({ collection: mapNftCollection(nftCollection) })
}
