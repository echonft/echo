import { OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { propEq } from 'ramda'

export function isOfferRoleSender(offer: OfferWithRole) {
  return propEq(OFFER_ROLE_SENDER, 'role', offer)
}
