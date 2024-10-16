import type { TokenType } from '@echo/model/constants/token-type'
import type { NftIndex } from '@echo/model/types/nft/nft'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'

export interface Erc1155Token extends Omit<Erc721Token, 'type'> {
  decimals: 0
  type: TokenType.Erc1155
}

export type Erc1155TokenIndex = NftIndex & Record<'type', TokenType.Erc1155>
