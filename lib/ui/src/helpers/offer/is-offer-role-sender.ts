import { OfferRole } from '@echo/model/constants/offer-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { propEq } from 'ramda'

export function isOfferRoleSender(offer: OfferWithRole) {
  return propEq(OfferRole.Sender, 'role', offer)
}
