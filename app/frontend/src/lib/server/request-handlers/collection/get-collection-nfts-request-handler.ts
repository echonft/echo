import { type ApiRequest } from '@echo/api/types/api-request'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { guarded_getNftsForCollection } from '@echo/frontend/lib/server/helpers/nft/guarded_get-nfts-for-collection'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { NextResponse } from 'next/server'

export async function getCollectionNftsRequestHandler(req: ApiRequest<never>, slug: string) {
  const constraints = parseConstraintsQuery(req)
  const nfts = await guarded_getNftsForCollection(slug, constraints)
  return NextResponse.json<NftsResponse>({ nfts })
}
