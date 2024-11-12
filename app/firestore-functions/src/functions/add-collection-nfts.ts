import type { AddCollectionNftsTaskData } from '@echo/firestore-functions/tasks/add-collection-nfts-task'
import { onTaskDispatched } from '@echo/firestore-functions/tasks/helpers/on-task-dispatched'
import { addCollectionNftsRequestHandler } from '@echo/firestore-functions/tasks/request-handlers/add-collection-nfts-request-handler'

export const addCollectionNfts = onTaskDispatched<AddCollectionNftsTaskData>(addCollectionNftsRequestHandler)
