import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { ForbiddenError } from '@echo/frontend/lib/server/helpers/error/forbidden-error'
import { type Offer } from '@echo/model/types/offer'
import { type User } from '@echo/model/types/user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { isNil } from 'ramda'

export function assertOfferSenderIs(
  offer: Offer,
  username: string
): asserts offer is Omit<Offer, 'sender'> & Record<'sender', User> {
  if (isNil(offer.sender) || isNilOrEmpty(offer.sender.username)) {
    throw new BadRequestError(`offer with id ${offer.id} does not contain a sender`)
  }
  if (offer.sender.username !== username) {
    throw new ForbiddenError(`current user with username ${username} is not the sender of offer with id ${offer.id}`)
  }
}
