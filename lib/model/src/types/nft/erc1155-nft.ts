import type { TokenType } from '@echo/model/constants/token-type'
import type { Nft } from '@echo/model/types/nft/nft'

export type Erc1155Nft = Omit<Nft, 'type'> & Record<'type', TokenType.Erc1155>
