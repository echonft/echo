import { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { Nft } from '@echo/ui/types/model/nft'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getNftName(nft: Nft | NftResponse): string {
  const { name, collection, tokenId } = nft
  if (isNilOrEmpty(name)) {
    return `${collection.name} #${tokenId}`
  }
  return name
}
