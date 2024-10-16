import type { Nft } from '@echo/model/types/nft/nft'

export type NftDocumentData = Omit<Nft, 'tokenIdLabel'>
