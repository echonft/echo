import type { User } from '@echo/model/types/user'

export interface EscrowedNftDocumentData {
  nftId: string
  owner: User
}
