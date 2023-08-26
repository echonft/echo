import { CollectionName } from '../../constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '../../constants/default-expiration-time'
import { swapDataConverter } from '../../converters/swap-data-converter'
import { firestore } from '../../services/firestore'
import { Swap } from '../../types/model/swap'
import { findOfferById } from '../offer/find-offer-by-id'
import dayjs from 'dayjs'
import { assoc, isNil, pipe } from 'ramda'

export const addSwap = async (offerId: string): Promise<string> => {
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error('invalid offer id')
  }
  const reference = firestore().collection(CollectionName.SWAPS).doc()
  const swapId = reference.id
  const swap = pipe(
    assoc('id', swapId),
    assoc('createdAt', dayjs()),
    assoc('expiresAt', dayjs().add(DEFAULT_EXPIRATION_TIME, 'day')),
    assoc('postedAt', undefined),
    assoc('state', 'PENDING_APPROVALS')
  )({ offer }) as Swap

  await reference.set(swapDataConverter.toFirestore(swap))
  // update listings tied to this swap (if any)
  // TODO
  return swapId
}
