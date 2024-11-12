import { changeSnapshotDataPropUpdated } from '@echo/firestore-functions/firestore-triggers/helpers/change-snapshot-data-prop-updated'
import type { FirestoreEventChangeSnapshotDataReturn } from '@echo/firestore-functions/firestore-triggers/helpers/firestore-event-change-snapshot-data'
import { cancelNftListingsTask } from '@echo/firestore-functions/tasks/cancel-nft-listings-task'
import { cancelNftOffersTask } from '@echo/firestore-functions/tasks/cancel-nft-offers-task'
import { enqueueTask } from '@echo/firestore-functions/tasks/helpers/enqueue-task'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { eqUser } from '@echo/model/helpers/user/eq-user'
import { andThen, isNil, pipe } from 'ramda'

export async function onNftUpdatedTriggerHandler(data: FirestoreEventChangeSnapshotDataReturn<NftDocument>) {
  const { updated } = changeSnapshotDataPropUpdated<NftDocument, 'owner'>(data, 'owner', eqUser)
  if (updated) {
    const nft = data.after ?? data.before
    if (!isNil(nft)) {
      await pipe(cancelNftListingsTask, andThen(enqueueTask))(nft)
      await pipe(cancelNftOffersTask, andThen(enqueueTask))(nft)
    }
  }
}
