import type { Nft } from '@echo/model/types/nft'

export function mapNftToQueryParam(nft: Nft): string {
  return `${nft.collection.slug}|${nft.tokenId}`
}
