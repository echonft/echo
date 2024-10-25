import type { Nft, NftIndex, NftOwner } from '@echo/model/types/nft'

export interface OwnedNft extends Omit<Nft, 'owner'> {
  owner: NftOwner
}

export interface OwnedNftIndex extends NftIndex {
  owner: NftOwner
}
