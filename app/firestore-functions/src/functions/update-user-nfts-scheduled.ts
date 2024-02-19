import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { FirestoreFunctionsLogger } from '@echo/firestore-functions/services/firestore-functions-logger'
import { updateUsersNfts } from '@echo/tasks/nft/update-users-nfts'
import { onSchedule } from 'firebase-functions/v2/scheduler'

export const updateUserNftsScheduled = onSchedule(setMaxInstances({ schedule: 'every 1 hours' }), async () => {
  const logger = new FirestoreFunctionsLogger()
  await updateUsersNfts(logger)
})
