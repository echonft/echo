import { OFFER_ROLE_RECEIVER } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer'
import type { OfferRole } from '@echo/model/types/offer-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { assoc } from 'ramda'

export function setOfferRoleReceiver(offer: Offer): OfferWithRole {
  return assoc<OfferRole, Offer, 'role'>('role', OFFER_ROLE_RECEIVER, offer)
}
