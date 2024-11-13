import { expireOfferTask } from '@echo/firestore-functions/tasks/expire-offer-task'
import { enqueueTask } from '@echo/firestore-functions/tasks/helpers/enqueue-task'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { info } from 'firebase-functions/logger'
import { andThen, pipe } from 'ramda'

export async function onOfferCreatedTriggerHandler(document: Nullable<OfferDocument>) {
  info({ offer: document }, 'offer was created')
  await unlessNil(pipe(expireOfferTask, andThen(enqueueTask)))(document)
  info({ offer: document }, 'added expire offer task')
}
