import type { ApiRequest } from '@echo/api/types/api-request'
import { type NftResponse } from '@echo/api/types/responses/nft-response'
import { findNftByCollection } from '@echo/firestore/crud/nft/find-nft-by-collection'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { guarded_assertNftExists } from '@echo/frontend/lib/helpers/nft/assert/guarded_assert-nft-exists'
import { positiveIntegerStringSchema } from '@echo/frontend/lib/validators/positive-integer-string-schema'
import { NextResponse } from 'next/server'

export async function getNftRequestHandler(_req: ApiRequest<never>, params: { slug: string; tokenId: string }) {
  const { slug, tokenId } = params
  const validTokenId = guardFn(
    (tokenId) => positiveIntegerStringSchema.parse(tokenId),
    ErrorStatus.BAD_REQUEST
  )(tokenId)
  const nft = await guardAsyncFn(findNftByCollection, ErrorStatus.SERVER_ERROR)(slug, validTokenId)
  guarded_assertNftExists(nft, slug, tokenId)
  return NextResponse.json<NftResponse>({ nft })
}
