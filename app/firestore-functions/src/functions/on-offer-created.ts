import { enqueueTask } from '@echo/firestore-functions/helpers/enqueue-task'
import { getFirestoreEventData } from '@echo/firestore-functions/helpers/get-firestore-event-data'
import { onDocumentCreated } from '@echo/firestore-functions/helpers/on-document-created'
import { expireOfferTask } from '@echo/firestore-functions/tasks/expire-offer-task'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import { andThen, pipe } from 'ramda'

export const onOfferCreated = onDocumentCreated(CollectionPath.Offers, async (event) => {
  const offer = getFirestoreEventData<OfferDocument>(event)
  await unlessNil(pipe(expireOfferTask, andThen(enqueueTask)))(offer)
})
