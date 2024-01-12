import { type ApiRequest } from '@echo/api/types/api-request'
import { type NftsResponse } from '@echo/api/types/responses/nfts-response'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { parseConstraintsQuery } from '@echo/frontend/lib/server/helpers/request/parse-constraints-query'
import { NextResponse } from 'next/server'

export async function getCollectionNftsRequestHandler(req: ApiRequest<never>, params: { slug: string }) {
  const { slug } = params
  const constraints = guardFn(parseConstraintsQuery, ErrorStatus.BAD_REQUEST)(req)
  const nfts = await guardAsyncFn(getNftsForCollection, ErrorStatus.SERVER_ERROR)(slug, constraints)
  return NextResponse.json<NftsResponse>({ nfts })
}
