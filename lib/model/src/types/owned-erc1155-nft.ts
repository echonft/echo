import type { TokenType } from '@echo/model/constants/token-type'
import type { OwnedNft } from '@echo/model/types/owned-nft'

export interface OwnedErc1155Nft extends Omit<OwnedNft, 'type'> {
  type: TokenType.Erc1155
}
