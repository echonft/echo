import { OfferRole } from '@echo/model/constants/offer-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { propEq } from 'ramda'

export function isOfferRoleReceiver(offer: OfferWithRole) {
  return propEq(OfferRole.Receiver, 'role', offer)
}
