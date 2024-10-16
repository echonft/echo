import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'

export type Erc1155TokenDocumentData = Omit<Erc1155Token, 'tokenIdLabel'>
