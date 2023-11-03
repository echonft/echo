import { type ApiRequest } from '@echo/api/types/api-request'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { guaded_getNftsForOwner } from '@echo/frontend/lib/server/helpers/nft/guaded_get-nfts-for-owner'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { NextResponse } from 'next/server'

export async function getUserNftsRequestHandler(req: ApiRequest<never>, username: string) {
  const constraints = parseConstraintsQuery(req)
  const nfts = await guaded_getNftsForOwner(username, constraints)
  return NextResponse.json<NftsResponse>({ nfts })
}
