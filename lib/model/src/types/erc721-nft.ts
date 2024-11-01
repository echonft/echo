import type { TokenType } from '@echo/model/constants/token-type'
import type { Nft, OwnedNft } from '@echo/model/types/nft'

export interface Erc721Nft extends Omit<Nft, 'type'> {
  type: TokenType.Erc721
}

export interface OwnedErc721Nft extends Omit<OwnedNft, 'type'> {
  type: TokenType.Erc721
}
