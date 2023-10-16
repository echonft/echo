import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { head, path, pipe, prop } from 'ramda'

export function getOfferSender(offer: Offer) {
  return pipe(prop('senderItems'), head, path(['nft', 'owner']))(offer) as User
}
