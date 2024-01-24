import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferThread, OfferThreadDiscordGuild } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { now } from '@echo/utils/helpers/now'
import { isNil, pipe } from 'ramda'

export async function addOfferThread(offerId: string, guild: OfferThreadDiscordGuild): Promise<OfferThread> {
  const offer = await findOfferById(offerId)
  if (isNil(offer)) {
    throw Error(`trying to add thread for offer with id ${offerId} but this offer does not exist`)
  }
  return pipe(
    getOfferThreadsCollectionReference,
    setReference({
      offerId,
      guild,
      postedAt: now()
    })
  )()
}
