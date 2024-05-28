import { nftTokenIdComparator } from '@echo/model/helpers/nft/nft-token-id-comparator'
import type { Nft } from '@echo/model/types/nft'

export function nftByTokenIdComparator<T extends Partial<Nft> & Required<Pick<Nft, 'tokenId'>>>(nftA: T, nftB: T) {
  return nftTokenIdComparator(nftA.tokenId, nftB.tokenId)
}
