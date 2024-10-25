import type { TokenType } from '@echo/model/constants/token-type'
import type { Nft } from '@echo/model/types/nft'

export interface Erc1155Nft extends Omit<Nft, 'type'> {
  type: TokenType.Erc1155
}
