import type { Erc1155Nft } from '@echo/model/types/nft/erc1155-nft'
import type { User } from '@echo/model/types/user/user'

export interface OwnedErc1155Nft extends Omit<Erc1155Nft, 'owner'> {
  owner: User
}
