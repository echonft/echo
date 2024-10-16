import type { User } from '@echo/model/types/user/user'

export interface EscrowedNftDocumentData {
  nftId: string
  owner: User
}
