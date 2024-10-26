import { nftTokenToNft } from '@echo/model/mappers/token/nft-token-to-nft'
import type { Erc1155Token } from '@echo/model/types/erc1155-token'
import type { NftOwner } from '@echo/model/types/nft'
import type { OwnedErc1155Nft } from '@echo/model/types/owned-erc1155-nft'

export function erc1155TokenToNft(owner: NftOwner): (token: Erc1155Token) => Omit<OwnedErc1155Nft, 'attributes'> {
  return function (token: Erc1155Token): Omit<OwnedErc1155Nft, 'attributes'> {
    return nftTokenToNft<Erc1155Token>(owner)(token)
  }
}
