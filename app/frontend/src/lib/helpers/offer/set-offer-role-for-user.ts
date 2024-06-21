import type { User } from '@echo/auth/types/user'
import { setOfferRoleReceiver } from '@echo/frontend/lib/helpers/offer/set-offer-role-receiver'
import { setOfferRoleSender } from '@echo/frontend/lib/helpers/offer/set-offer-role-sender'
import { setOfferRoleUndefined } from '@echo/frontend/lib/helpers/offer/set-offer-role-undefined'
import type { Offer } from '@echo/model/types/offer'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function setOfferRoleForUser(user: Nullable<User>) {
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
