import type { TokenType } from '@echo/model/constants/token-type'
import type { Nft, OwnedNft } from '@echo/model/types/nft'

export interface Erc1155Nft extends Omit<Nft, 'type'> {
  type: TokenType.Erc1155
}

export interface OwnedErc1155Nft extends Omit<OwnedNft, 'type'> {
  type: TokenType.Erc1155
}
