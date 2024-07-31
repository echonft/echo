import { nftByTokenIdComparator } from '@echo/model/helpers/nft/nft-by-token-id-comparator'
import { ownedNftComparator } from '@echo/model/helpers/nft/owned-nft-comparator'
import type { OwnedNft } from '@echo/model/types/nft'
import { sortWith } from 'ramda'

export function sortNftsByOwner(nfts: OwnedNft[]): OwnedNft[] {
  return sortWith([ownedNftComparator, nftByTokenIdComparator], nfts)
}
