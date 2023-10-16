import type { Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { ForbiddenError } from '@server/helpers/error/forbidden-error'
import { isNil } from 'ramda'

export function assertOfferReceiverIs(offer: Offer, username: string): asserts offer is Offer & { receiver: User } {
  if (isNil(offer.receiver) || isNilOrEmpty(offer.receiver.username)) {
    throw new BadRequestError(`offer with id ${offer.id} does not contain a receiver`)
  }
  if (offer.receiver.username !== username) {
    throw new ForbiddenError(`current user with username ${username} is not the receiver of offer with id ${offer.id}`)
  }
}
