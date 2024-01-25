import type { AuthUser } from '@echo/model/types/auth-user'
import type { Offer } from '@echo/model/types/offer'
import { setOfferRoleReceiver } from '@echo/ui/helpers/offer/set-offer-role-receiver'
import { setOfferRoleSender } from '@echo/ui/helpers/offer/set-offer-role-sender'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'

export function setOfferRoleForUser(offer: Offer, user: AuthUser): OfferWithRole {
  const { username } = user
  if (offer.sender.username === username) {
    return setOfferRoleSender(offer)
  }
  if (offer.receiver.username === username) {
    return setOfferRoleReceiver(offer)
  }
  throw Error(`user is neither the sender nor the receiver`)
}
