import { tokenToNft } from '@echo/model/mappers/nft/token-to-nft'
import type { OwnedErc721Nft } from '@echo/model/types/nft/owned-erc721-nft'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'
import type { User } from '@echo/model/types/user/user'

export function erc721TokenToNft(owner: User): (token: Erc721Token) => Omit<OwnedErc721Nft, 'attributes'> {
  return function (token: Erc721Token): Omit<OwnedErc721Nft, 'attributes'> {
    return tokenToNft<Erc721Token>(owner)(token)
  }
}
