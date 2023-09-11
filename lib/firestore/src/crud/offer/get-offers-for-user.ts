import { getOffersForReceiver } from './get-offers-for-receiver'
import { getOffersForSender } from './get-offers-for-sender'
import { Offer, OfferQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { concat, eqProps, pipe, uniqWith } from 'ramda'

export async function getOffersForUser(
  userId: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints
): Promise<Partial<Offer>[]> {
  const offersAsReceiver = await getOffersForReceiver(userId, filters, constraints)
  const offersAsSender = await getOffersForSender(userId, filters, constraints)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(concat, uniqWith(eqProps('id')))(offersAsReceiver, offersAsSender)
}
