import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import type { OfferThread, OfferThreadDiscordGuild } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { now } from '@echo/utils/helpers/now'
import { isNil } from 'ramda'

export async function addOfferThread(offerId: string, guild: OfferThreadDiscordGuild) {
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add thread for offer with id ${offerId} but this offer does not exist`)
  }
  const reference = getOfferThreadsCollectionReference().doc()
  const id = reference.id
  const newOfferThread: OfferThread = {
    id,
    offerId,
    guild,
    postedAt: now()
  }
  await reference.set(newOfferThread)
  return newOfferThread
}
