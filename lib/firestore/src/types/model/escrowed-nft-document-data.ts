import type { NftOwner } from '@echo/model/types/nft'

export interface EscrowedNftDocumentData {
  nftId: string
  owner: NftOwner
}
