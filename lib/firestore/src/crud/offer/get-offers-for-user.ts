import { getOffersForReceiver } from '@echo/firestore/crud/offer/get-offers-for-receiver'
import { getOffersForSender } from '@echo/firestore/crud/offer/get-offers-for-sender'
import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { type Offer } from '@echo/model/types/offer'
import { concat, eqProps, pipe, uniqWith } from 'ramda'

export async function getOffersForUser(
  username: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints
): Promise<Offer[]> {
  const offersAsReceiver = await getOffersForReceiver(username, filters, constraints)
  const offersAsSender = await getOffersForSender(username, filters, constraints)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(concat, uniqWith(eqProps('id')))(offersAsReceiver, offersAsSender)
}
