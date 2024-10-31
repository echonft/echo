import type { User } from '@echo/model/types/user'

export interface EscrowedNftDocument {
  nftId: string
  owner: User
}
