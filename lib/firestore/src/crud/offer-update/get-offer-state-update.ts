import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferUpdateDocumentData } from '@echo/firestore/types/model/offer-update-document-data'
import type { OfferState } from '@echo/model/constants/offer-state'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

interface GetOfferStateUpdateArgs {
  offerId: string
  state: OfferState
}

export function getOfferStateUpdateSnapshot(
  args: GetOfferStateUpdateArgs
): Promise<Nullable<QueryDocumentSnapshot<OfferUpdateDocumentData, OfferUpdateDocumentData>>> {
  const { offerId, state } = args
  return pipe(
    getOfferUpdatesCollectionReference,
    queryWhere('offerId', '==', offerId),
    queryWhere('update.args.state', '==', state),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getOfferStateUpdate(args: GetOfferStateUpdateArgs): Promise<Nullable<OfferUpdateDocumentData>> {
  return pipe(getOfferStateUpdateSnapshot, andThen(getDocumentSnapshotData))(args)
}
