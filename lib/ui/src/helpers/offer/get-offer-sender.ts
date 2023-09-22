import type { Offer } from '@echo/ui/types/model/offer'
import { UserDetails } from '@echo/ui/types/model/user-details'
import { head, path, pipe, prop } from 'ramda'

export function getOfferSender(offer: Offer) {
  return pipe(prop('senderItems'), head, path(['nft', 'owner']))(offer) as UserDetails
}
