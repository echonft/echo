import { OFFER_ROLE_RECEIVER } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { assoc } from 'ramda'

export function setOfferRoleReceiver(offer: Offer): OfferWithRole {
  return assoc('role', OFFER_ROLE_RECEIVER, offer)
}
