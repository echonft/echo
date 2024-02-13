import { updateAllUsersNfts } from '@echo/firestore-functions/helper/update-all-users-nfts'
import { initializeApp } from 'firebase-admin/app'
import { log } from 'firebase-functions/logger'
import { setGlobalOptions } from 'firebase-functions/v2/options'
import { onSchedule } from 'firebase-functions/v2/scheduler'

initializeApp()
setGlobalOptions({ maxInstances: 10 })

export const updateUserNftsDaily = onSchedule({ schedule: '0 0 * * *' }, async () => {
  log('Updating all users NFTs...')
  await updateAllUsersNfts()
})
