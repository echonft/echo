import type { ArrayIndex } from '@echo/firestore/types/array-index'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import type { NftIndex } from '@echo/model/types/nft'

export function nftArrayIndex<T extends NftIndex>(nft: T): ArrayIndex {
  return serializeNft(nft)
}
