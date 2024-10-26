import type { Nft, NftOwner } from '@echo/model/types/nft'

export type NftDocument = Nft

export interface OwnedNftDocument extends Omit<NftDocument, 'owner'> {
  owner: NftOwner
}
