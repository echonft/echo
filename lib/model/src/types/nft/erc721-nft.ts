import type { TokenType } from '@echo/model/constants/token-type'
import type { Nft } from '@echo/model/types/nft/nft'

export interface Erc721Nft extends Omit<Nft, 'type'> {
  type: TokenType.Erc721
}
