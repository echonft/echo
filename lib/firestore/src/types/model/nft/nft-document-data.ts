import type { Nft } from '@echo/model/types/nft'

export type NftDocumentData = Omit<Nft, 'tokenIdLabel'>
