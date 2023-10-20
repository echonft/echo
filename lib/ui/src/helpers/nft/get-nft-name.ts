import { type Nft } from '@echo/model/types/nft'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getNftName(nft: Nft): string {
  const { name, collection, tokenId } = nft
  if (isNilOrEmpty(name)) {
    return `${collection.name} #${tokenId}`
  }
  return name
}
