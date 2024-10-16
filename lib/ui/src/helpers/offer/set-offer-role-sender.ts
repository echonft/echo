import { OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer/offer'
import type { OfferRole } from '@echo/model/types/offer/offer-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { assoc } from 'ramda'

export function setOfferRoleSender(offer: Offer): OfferWithRole {
  return assoc<OfferRole, Offer, 'role'>('role', OFFER_ROLE_SENDER, offer)
}
