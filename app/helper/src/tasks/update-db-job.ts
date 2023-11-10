import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { guardAsyncFn } from '@echo/helper/errors/guard-async-fn'
import { updateAllNfts } from '@echo/helper/services/nft/update-all-nfts'
import { CronJob } from 'cron'

export function updateDbJob() {
  // Run the DB update at midnight every day
  CronJob.from({
    cronTime: '00 00 00 * * *',
    onTick: function () {
      initializeFirebase()
      void guardAsyncFn(updateAllNfts, void 0)()
    },
    start: true,
    timeZone: 'America/New_York'
  })
}
