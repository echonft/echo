import { tokenToNft } from '@echo/model/mappers/nft/token-to-nft'
import type { OwnedErc1155Nft } from '@echo/model/types/nft/owned-erc1155-nft'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import type { User } from '@echo/model/types/user/user'

export function erc1155TokenToNft(owner: User): (token: Erc1155Token) => Omit<OwnedErc1155Nft, 'attributes'> {
  return function (token: Erc1155Token): Omit<OwnedErc1155Nft, 'attributes'> {
    return tokenToNft<Erc1155Token>(owner)(token)
  }
}
