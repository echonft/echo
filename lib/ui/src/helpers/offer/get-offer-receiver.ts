import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { head, path, pipe, prop } from 'ramda'

export function getOfferReceiver(offer: Offer) {
  return pipe(prop('receiverItems'), head, path(['nft', 'owner']))(offer) as User
}
