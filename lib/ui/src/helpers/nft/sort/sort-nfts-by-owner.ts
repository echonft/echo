import { nftByTokenIdComparator } from '@echo/model/helpers/nft/nft-by-token-id-comparator'
import { nftOwnerComparator } from '@echo/model/helpers/nft/nft-owner-comparator'
import type { OwnedNft } from '@echo/model/types/nft'
import { sortWith } from 'ramda'

export function sortNftsByOwner(nfts: OwnedNft[]): OwnedNft[] {
  return sortWith([nftOwnerComparator, nftByTokenIdComparator], nfts)
}
