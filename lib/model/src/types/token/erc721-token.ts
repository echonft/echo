import type { TokenType } from '@echo/model/constants/token-type'
import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import type { NftCollection, NftIndex } from '@echo/model/types/nft/nft'
import type { Token } from '@echo/model/types/token/token'

export interface Erc721Token extends Omit<Token, 'type'>, Omit<Erc721Nft, 'attributes' | 'collection' | 'owner'> {
  collection: Omit<NftCollection, 'contract'>
  type: TokenType.Erc721
}

export interface Erc721TokenIndex extends NftIndex {
  type: TokenType.Erc721
}
