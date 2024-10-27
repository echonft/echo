import type { UserWithWallet } from '@echo/model/types/user'

export interface EscrowedNftDocument {
  nftId: string
  owner: UserWithWallet
}
