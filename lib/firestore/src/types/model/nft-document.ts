import type { Nft } from '@echo/model/types/nft'
import type { UserWithWallet } from '@echo/model/types/user'

export type NftDocument = Nft

export interface OwnedNftDocument extends Omit<NftDocument, 'owner'> {
  owner: UserWithWallet
}
