import type { Nft, NftIndex } from '@echo/model/types/nft/nft'
import type { User } from '@echo/model/types/user/user'

export interface OwnedNft extends Omit<Nft, 'owner'> {
  owner: User
}

export interface OwnedNftIndex extends NftIndex {
  owner: User
}
