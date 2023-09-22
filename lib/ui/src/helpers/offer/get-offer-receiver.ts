import type { Offer } from '@echo/ui/types/model/offer'
import { UserDetails } from '@echo/ui/types/model/user-details'
import { head, path, pipe, prop } from 'ramda'

export function getOfferReceiver(offer: Offer) {
  return pipe(prop('receiverItems'), head, path(['nft', 'owner']))(offer) as UserDetails
}
