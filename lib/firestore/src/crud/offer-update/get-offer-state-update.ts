import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferUpdate } from '@echo/firestore/types/model/offer-update/offer-update'
import type { OfferState } from '@echo/model/types/offer-state'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

interface GetOfferStateUpdateArgs {
  offerId: string
  state: OfferState
}

export function getOfferStateUpdateSnapshot(
  args: GetOfferStateUpdateArgs
): Promise<Nullable<QueryDocumentSnapshot<OfferUpdate>>> {
  const { offerId, state } = args
  return pipe(
    getOfferUpdatesCollectionReference,
    queryWhere<OfferUpdate>('offerId', '==', offerId),
    queryWhere<OfferUpdate>('update.args.state', '==', state),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getOfferStateUpdate(args: GetOfferStateUpdateArgs): Promise<Nullable<OfferUpdate>> {
  return pipe(getOfferStateUpdateSnapshot, andThen(getDocumentSnapshotData))(args)
}
