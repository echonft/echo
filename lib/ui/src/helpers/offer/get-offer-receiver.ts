import type { Offer } from '@echo/ui/types/model/offer'
import type { User } from '@echo/ui/types/model/user'
import { head, path, pipe, prop } from 'ramda'

export function getOfferReceiver(offer: Offer) {
  return pipe(prop('receiverItems'), head, path(['nft', 'owner']))(offer) as User
}
