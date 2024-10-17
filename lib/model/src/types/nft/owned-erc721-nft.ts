import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import type { User } from '@echo/model/types/user/user'

export interface OwnedErc721Nft extends Omit<Erc721Nft, 'owner'> {
  owner: User
}
