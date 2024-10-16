import type { TokenType } from '@echo/model/constants/token-type'
import type { Nft } from '@echo/model/types/nft/nft'

export type Erc721Nft = Omit<Nft, 'type'> & Record<'type', TokenType.Erc721>
