import { nftTokenToNft } from '@echo/model/mappers/token/nft-token-to-nft'
import type { Erc721Token } from '@echo/model/types/erc721-token'
import type { NftOwner } from '@echo/model/types/nft'
import type { OwnedErc721Nft } from '@echo/model/types/owned-erc721-nft'

export function erc721TokenToNft(owner: NftOwner): (token: Erc721Token) => Omit<OwnedErc721Nft, 'attributes'> {
  return function (token: Erc721Token): Omit<OwnedErc721Nft, 'attributes'> {
    return nftTokenToNft<Erc721Token>(owner)(token)
  }
}
