import { BadRequestError } from '../../helpers/error/bad-request-error'
import { assertNft } from '../../helpers/nft/assert-nft'
import { getNftByCollection } from '../../helpers/nft/get-nft-by-collection'
import { mapNft } from '../../mappers/to-response/map-nft'
import { tokenIdSchema } from '../../validators/token-id-schema'
import { ApiRequest, GetNftResponse } from '@echo/api'
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
  const nft = await getNftByCollection(slug, validTokenId)
  assertNft(nft)
  return NextResponse.json<GetNftResponse>({ nft: mapNft(nft) })
}
