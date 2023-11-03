import { type ApiRequest } from '@echo/api/types/api-request'
import { type NftResponse } from '@echo/api/types/responses/nft-response'
import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { assertNftExists } from '@echo/frontend/lib/server/helpers/nft/assert/assert-nft-exists'
import { guarded_findNftByCollection } from '@echo/frontend/lib/server/helpers/nft/guarded_find-nft-by-collection'
import { tokenIdSchema } from '@echo/frontend/lib/server/validators/token-id-schema'
import { NextResponse } from 'next/server'

function parseTokenId(tokenId: number): number {
  try {
    return tokenIdSchema.parse(tokenId)
  } catch (e) {
    throw new BadRequestError(`error parsing token id ${tokenId}`, e)
  }
}

export async function getNftRequestHandler(_req: ApiRequest<never>, slug: string, tokenId: string) {
  const validTokenId = parseTokenId(parseInt(tokenId))
  const nft = await guarded_findNftByCollection(slug, validTokenId)
  assertNftExists(nft, slug, tokenId)
  return NextResponse.json<NftResponse>({ nft })
}
