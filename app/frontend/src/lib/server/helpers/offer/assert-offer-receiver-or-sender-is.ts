import { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { ForbiddenError } from '@server/helpers/error/forbidden-error'
import { isNil } from 'ramda'

export function assertOfferReceiverOrSenderIs(
  offer: FirestoreOffer,
  username: string
): asserts offer is FirestoreOffer & Record<'receiver', FirestoreUserDetails> & Record<'sender', FirestoreUserDetails> {
  if (isNil(offer.receiver) || isNilOrEmpty(offer.receiver.username)) {
    throw new BadRequestError(`offer with id ${offer.id} does not contain a receiver`)
  }
  if (isNil(offer.sender) || isNilOrEmpty(offer.sender.username)) {
    throw new BadRequestError(`offer with id ${offer.id} does not contain a sender`)
  }
  if (offer.receiver.username !== username && offer.sender.username !== username) {
    throw new ForbiddenError(
      `current user with username ${username} is neither the receiver nor the sender of offer with id ${offer.id}`
    )
  }
}
