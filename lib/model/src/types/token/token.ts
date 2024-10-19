import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import type { Erc20Token } from '@echo/model/types/token/erc20-token'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'

export type Token = Erc20Token | Erc721Token | Erc1155Token
