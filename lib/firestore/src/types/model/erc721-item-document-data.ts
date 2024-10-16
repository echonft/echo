import type { Erc721Token } from '@echo/model/types/token/erc721-token'

export type Erc721TokenDocumentData = Omit<Erc721Token, 'tokenIdLabel'>
