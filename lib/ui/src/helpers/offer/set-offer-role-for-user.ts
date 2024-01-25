import type { AuthUser } from '@echo/model/types/auth-user'
import type { Offer } from '@echo/model/types/offer'
import { setOfferRoleReceiver } from '@echo/ui/helpers/offer/set-offer-role-receiver'
import { setOfferRoleSender } from '@echo/ui/helpers/offer/set-offer-role-sender'
import { setOfferRoleUndefined } from '@echo/ui/helpers/offer/set-offer-role-undefined'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { isNil } from 'ramda'

export function setOfferRoleForUser(user: AuthUser | undefined) {
  return function (offer: Offer): OfferWithRole {
    if (isNil(user)) {
      return setOfferRoleUndefined(offer)
    }
    const { username } = user
    if (offer.sender.username === username) {
      return setOfferRoleSender(offer)
    }
    if (offer.receiver.username === username) {
      return setOfferRoleReceiver(offer)
    }
    return setOfferRoleUndefined(offer)
  }
}
