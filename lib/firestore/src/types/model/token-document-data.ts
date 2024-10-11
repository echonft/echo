import type { Erc1155Token, Erc20Token, Erc721Token } from '@echo/model/types/token'

export type Erc20TokenDocumentData = Erc20Token
export type Erc721TokenDocumentData = Omit<Erc721Token, 'tokenIdLabel'>
export type Erc1155TokenDocumentData = Omit<Erc1155Token, 'tokenIdLabel'>
