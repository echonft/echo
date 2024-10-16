import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { type User } from '@echo/model/types/user/user'
import type { NonEmptyArray } from 'ramda'

export interface BaseOffer {
  expiresAt: number
  receiver: User
  receiverItems: NonEmptyArray<OwnedNft>
  sender: User
  senderItems: NonEmptyArray<OwnedNft>
}
