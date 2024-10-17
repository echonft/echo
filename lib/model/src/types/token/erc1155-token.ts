import type { TokenType } from '@echo/model/constants/token-type'
import type { NftIndex } from '@echo/model/types/nft/nft'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'

export interface Erc1155Token extends Omit<Erc721Token, 'type'> {
  type: TokenType.Erc1155
}

export interface Erc1155TokenIndex extends NftIndex {
  type: TokenType.Erc1155
}
