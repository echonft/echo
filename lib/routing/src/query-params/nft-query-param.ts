import { serializeNft } from '@echo/model/serializers/serialize-nft'
import type { NftIndex } from '@echo/model/types/nft'

export function nftQueryParam(nft: NftIndex): string {
  return serializeNft(nft)
}
