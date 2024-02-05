import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import type { OfferState } from '@echo/model/types/offer-state'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function findOfferStateUpdate(offerId: string, state: OfferState): Promise<Nullable<OfferUpdate>> {
  return pipe(
    getOfferUpdatesCollectionReference,
    queryWhere<OfferUpdate>('offerId', '==', offerId),
    queryWhere<OfferUpdate>('update.args.state', '==', state),
    getQueryUniqueData
  )()
}
