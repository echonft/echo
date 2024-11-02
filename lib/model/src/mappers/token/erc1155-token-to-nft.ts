import { nftTokenToNft } from '@echo/model/mappers/token/nft-token-to-nft'
import type { OwnedErc1155Nft } from '@echo/model/types/nft'
import type { Erc1155Token } from '@echo/model/types/token'
import type { User } from '@echo/model/types/user'

export function erc1155TokenToNft(owner: User): (token: Erc1155Token) => Omit<OwnedErc1155Nft, 'attributes'> {
  return function (token: Erc1155Token): Omit<OwnedErc1155Nft, 'attributes'> {
    return nftTokenToNft<Erc1155Token>(owner)(token)
  }
}
