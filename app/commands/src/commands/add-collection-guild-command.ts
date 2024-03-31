import { addCollectionDefaultDiscordGuild } from '@echo/commands/tasks/add-collection-default-discord-guild'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -i  string  collection id
 *
 *  Adds the default (Echo) DiscordGuild to a collection. It's already done in the addCollection command,
 *  but it cases where collections were added without the command, it can be useful.
 */
void (async function () {
  const { i } = await yargs(hideBin(process.argv))
    .options({
      i: {
        alias: 'id',
        describe: 'collection id',
        type: 'string'
      }
    })
    .demandOption('i', 'collection id is required')
    .parse()
  initializeFirebase()
  await addCollectionDefaultDiscordGuild(i)
  await terminateFirestore()
  process.exit()
})()
