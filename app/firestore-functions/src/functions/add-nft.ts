import type { AddNftTaskData } from '@echo/firestore-functions/tasks/add-nft-task'
import { onTaskDispatched } from '@echo/firestore-functions/tasks/helpers/on-task-dispatched'
import { addNftRequestHandler } from '@echo/firestore-functions/tasks/request-handlers/add-nft-request-handler'

export const addNft = onTaskDispatched<AddNftTaskData>(addNftRequestHandler)
