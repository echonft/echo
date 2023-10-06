import { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { Nft } from '@echo/ui/types/model/nft'

export function getNftName(nft: Nft | NftResponse): string {
  return nft.name || `${nft.collection.name} #${nft.tokenId}`
}
