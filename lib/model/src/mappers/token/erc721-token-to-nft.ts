import { nftTokenToNft } from '@echo/model/mappers/token/nft-token-to-nft'
import type { Erc721Token } from '@echo/model/types/erc721-token'
import type { OwnedErc721Nft } from '@echo/model/types/owned-erc721-nft'
import type { UserWithWallet } from '@echo/model/types/user'

export function erc721TokenToNft(owner: UserWithWallet): (token: Erc721Token) => Omit<OwnedErc721Nft, 'attributes'> {
  return function (token: Erc721Token): Omit<OwnedErc721Nft, 'attributes'> {
    return nftTokenToNft<Erc721Token>(owner)(token)
  }
}
