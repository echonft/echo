import { Nft } from './nft'
import { User } from './user'

// TODO Might need to merge with prototype. Could have a request for offer
export interface NewOffer {
  receiverItems: Nft[]
  senderItems: Nft[]
  receiver: User
}
