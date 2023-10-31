import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import type { OfferStateUpdate } from '@echo/firestore/types/model/offer-update/offer-state-update'
import type { OfferState } from '@echo/model/types/offer-state'
import type { QuerySnapshot } from 'firebase-admin/firestore'

export async function findOfferStateUpdate(offerId: string, state: OfferState) {
  const querySnapshot = await getOfferUpdatesCollectionReference()
    .where('offerId', '==', offerId)
    // not needed for now since it's the only kind of update we have
    // TODO uncomment if we have more update kinds
    // .where('update.kind', '==', 'state')
    .where('update.args.state', '==', state)
    .get()
  return getQuerySnapshotDocumentData(querySnapshot as QuerySnapshot<OfferStateUpdate>)
}
