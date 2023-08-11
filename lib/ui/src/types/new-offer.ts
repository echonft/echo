import { Nft } from './nft'
import { User } from './user'

export interface NewOffer {
  receiverItems: Nft[]
  senderItems: Nft[]
  receiver: User
}
