import type { ApiRequest } from '@echo/api/types/api-request'
import type { NftsResponse } from '@echo/api/types/responses/nfts-response'
import { getNftsForUser } from '@server/helpers/nft/get-nfts-for-user'
import { parseConstraintsQuery } from '@server/helpers/request/parse-constraints-query'
import { NextResponse } from 'next/server'

export async function getUserNftsRequestHandler(req: ApiRequest<never>, username: string) {
  const constraints = parseConstraintsQuery(req)
  const nfts = await getNftsForUser(username, constraints)
  return NextResponse.json<NftsResponse>({ nfts })
}
