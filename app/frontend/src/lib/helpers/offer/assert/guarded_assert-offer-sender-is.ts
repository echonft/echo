import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { type Offer } from '@echo/model/types/offer'

export function guarded_assertOfferSenderIs(offer: Offer, username: string) {
  if (offer.sender.username !== username) {
    throw new ForbiddenError(`current user with username ${username} is not the sender of offer ${offer.id}`)
  }
}
