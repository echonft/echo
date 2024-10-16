import type { TokenType } from '@echo/model/constants/token-type'
import type { Nft, NftCollection, NftIndex } from '@echo/model/types/nft/nft'
import type { Token } from '@echo/model/types/token/token'
import type { Strict } from '@echo/utils/types/strict'

export interface Erc721Token extends Token, Omit<Nft, 'attributes' | 'collection' | 'owner'> {
  collection: Strict<Omit<NftCollection, 'contract'>, Omit<NftCollection, 'contract'>>
  type: TokenType.Erc721
}

export type Erc721TokenIndex = NftIndex & Record<'type', TokenType.Erc721>
