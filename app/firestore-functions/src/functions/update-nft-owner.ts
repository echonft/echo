import { onTaskDispatched } from '@echo/firestore-functions/tasks/helpers/on-task-dispatched'
import { updateNftOwnerRequestHandler } from '@echo/firestore-functions/tasks/request-handlers/update-nft-owner-request-handler'
import type { UpdateNftOwnerTaskData } from '@echo/firestore-functions/tasks/update-nft-owner-task'

export const updateNftOwner = onTaskDispatched<UpdateNftOwnerTaskData>(updateNftOwnerRequestHandler)
