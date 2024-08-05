import type { User } from '@echo/model/types/user'

export interface EscrowedNft {
  nftId: string
  owner: User
}
