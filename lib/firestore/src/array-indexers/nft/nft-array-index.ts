import type { ArrayIndex } from '@echo/firestore/types/array-index'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import type { NftIndex } from '@echo/model/types/nft/nft'

export function nftArrayIndex(nft: NftIndex): ArrayIndex {
  return serializeNft(nft)
}
