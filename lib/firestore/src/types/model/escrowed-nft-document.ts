import type { NftOwner } from '@echo/model/types/nft'

export interface EscrowedNftDocument {
  nftId: string
  owner: NftOwner
}
