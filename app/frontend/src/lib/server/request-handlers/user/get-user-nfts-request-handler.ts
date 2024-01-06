import { type ApiRequest } from '@echo/api/types/api-request'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { NextResponse } from 'next/server'

export async function getUserNftsRequestHandler(req: ApiRequest<never>, params: { username: string }) {
  const { username } = params
  const constraints = guardFn(parseConstraintsQuery, ErrorStatus.BAD_REQUEST)(req)
  const nfts = await guardAsyncFn(getNftsForOwner, ErrorStatus.SERVER_ERROR)(username, constraints)
  return NextResponse.json<NftsResponse>({ nfts })
}
