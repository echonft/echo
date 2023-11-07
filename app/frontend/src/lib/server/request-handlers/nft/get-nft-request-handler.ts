import { type NftResponse } from '@echo/api/types/responses/nft-response'
import { findNftByCollection } from '@echo/firestore/crud/nft/find-nft-by-collection'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertNftExists } from '@echo/frontend/lib/server/helpers/nft/assert/guarded_assert-nft-exists'
import { positiveIntegerStringSchema } from '@echo/frontend/lib/server/validators/positive-integer-string-schema'
import { NextResponse } from 'next/server'

export async function getNftRequestHandler(slug: string, tokenId: string) {
  const validTokenId = guardFn(
    (tokenId) => positiveIntegerStringSchema.parse(tokenId),
    ErrorStatus.BAD_REQUEST
  )(tokenId)
  const nft = await guardAsyncFn(findNftByCollection, ErrorStatus.SERVER_ERROR)(slug, validTokenId)
  guarded_assertNftExists(nft, slug, tokenId)
  return NextResponse.json<NftResponse>({ nft })
}
