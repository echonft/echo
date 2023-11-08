import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { updateAllNfts } from '@echo/helper/services/nft/update-all-nfts'
import { logger } from '@echo/utils/services/logger'
import { CronJob } from 'cron'

export function updateDbJob() {
  // Run the DB update at midnight every day
  CronJob.from({
    cronTime: '00 00 00 * * *',
    onTick: function () {
      logger.info('Will update all NFTs...')
      initializeFirebase()
      updateAllNfts()
        .then(() => logger.info('Updated all NFTs!'))
        .catch((e) => logger.error(`Error updating NFTs: ${e}`))
    },
    start: true,
    timeZone: 'America/New_York'
  })
}
