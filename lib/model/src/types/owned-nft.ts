import type { Nft, NftIndex } from '@echo/model/types/nft'
import type { UserWithWallet } from '@echo/model/types/user'

export interface OwnedNft extends Omit<Nft, 'owner'> {
  owner: UserWithWallet
}

export interface OwnedNftIndex extends NftIndex {
  owner: UserWithWallet
}
