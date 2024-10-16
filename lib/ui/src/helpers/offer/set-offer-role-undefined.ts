import type { Offer } from '@echo/model/types/offer/offer'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { assoc } from 'ramda'

export function setOfferRoleUndefined(offer: Offer): OfferWithRole {
  return assoc('role', undefined, offer)
}
