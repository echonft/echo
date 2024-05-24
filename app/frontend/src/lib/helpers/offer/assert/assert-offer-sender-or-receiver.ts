import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { type Offer } from '@echo/model/types/offer'

export function assertOfferSenderOrReceiver(offer: Offer, username: string) {
  if (offer.sender.username !== username && offer.receiver.username !== username) {
    throw new ForbiddenError(
      `current user with username ${username} is neither the sender nor the receiver of offer ${offer.slug}`
    )
  }
}
