import { nftTokenToNft } from '@echo/model/mappers/token/nft-token-to-nft'
import type { OwnedErc721Nft } from '@echo/model/types/nft'
import type { Erc721Token } from '@echo/model/types/token'
import type { User } from '@echo/model/types/user'

export function erc721TokenToNft(owner: User): (token: Erc721Token) => Omit<OwnedErc721Nft, 'attributes'> {
  return function (token: Erc721Token): Omit<OwnedErc721Nft, 'attributes'> {
    return nftTokenToNft<Erc721Token>(owner)(token)
  }
}
