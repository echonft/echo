import type { Nft } from '@echo/model/types/nft'
import { type User } from '@echo/model/types/user'

export interface BaseOffer {
  expiresAt: number
  receiver: User
  receiverItems: Nft[]
  sender: User
  senderItems: Nft[]
}
