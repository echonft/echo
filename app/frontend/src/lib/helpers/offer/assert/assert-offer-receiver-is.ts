import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { type Offer } from '@echo/model/types/offer'

export function assertOfferReceiverIs(offer: Offer, username: string) {
  if (offer.receiver.username !== username) {
    throw new ForbiddenError(`current user with username ${username} is not the receiver of offer ${offer.slug}`)
  }
}
