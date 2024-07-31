import type { OwnedNft } from '@echo/model/types/nft'
import { type User } from '@echo/model/types/user'
import type { NonEmptyArray } from 'ramda'

export interface BaseOffer {
  expiresAt: number
  receiver: User
  receiverItems: NonEmptyArray<OwnedNft>
  sender: User
  senderItems: NonEmptyArray<OwnedNft>
}
