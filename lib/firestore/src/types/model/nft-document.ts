import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'

export type NftDocument = Nft

export interface OwnedNftDocument extends Omit<NftDocument, 'owner'> {
  owner: User & Required<Pick<User, 'wallet'>>
}
