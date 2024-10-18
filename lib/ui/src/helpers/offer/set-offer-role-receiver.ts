import { OfferRole } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer/offer'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { assoc } from 'ramda'

export function setOfferRoleReceiver(offer: Offer): OfferWithRole {
  return assoc<OfferRole, Offer, 'role'>('role', OfferRole.Receiver, offer)
}
