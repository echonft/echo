import { addCollectionNftsTask } from '@echo/firestore-functions/tasks/add-collection-nfts-task'
import { enqueueTask } from '@echo/firestore-functions/tasks/helpers/enqueue-task'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, pipe } from 'ramda'

export async function onCollectionCreatedTriggerHandler(document: Nullable<CollectionDocument>) {
  await unlessNil(pipe(addCollectionNftsTask, andThen(enqueueTask)))(document)
}
