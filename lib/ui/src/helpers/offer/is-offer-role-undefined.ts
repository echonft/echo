import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { propEq } from 'ramda'

export function isOfferRoleUndefined(offer: OfferWithRole) {
  return propEq(undefined, 'role', offer)
}
