import { type ApiRequest } from '@echo/api/types/api-request'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { guarded_getNftsForOwner } from '@echo/frontend/lib/server/helpers/nft/guarded_get-nfts-for-owner'
import { guarded_parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/guarded_parse-constraints-query'
import { NextResponse } from 'next/server'

export async function getUserNftsRequestHandler(req: ApiRequest<never>, username: string) {
  const constraints = guarded_parseConstraintsQuery(req)
  const nfts = await guarded_getNftsForOwner(username, constraints)
  return NextResponse.json<NftsResponse>({ nfts })
}
