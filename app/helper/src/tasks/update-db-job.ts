import { updateDb } from '@echo/helper/tasks/update-db'
import { CronJob } from 'cron'

export function updateDbJob() {
  // Run the DB update at midnight every day
  CronJob.from({
    cronTime: '00 00 00 * * *',
    onTick: function () {
      void updateDb()
    },
    start: true,
    timeZone: 'America/New_York'
  })
}
