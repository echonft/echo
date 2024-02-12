import { addCollectionDefaultDiscordGuild } from '@echo/commands/tasks/add-collection-default-discord-guild'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  --collectionId
 *
 *  Adds the default (Echo) DiscordGuild to a collection. It's already done in the addCollection command,
 *  but it cases where collections were added without the command, it can be useful.
 */
void (async function () {
  const argv = yargs(hideBin(process.argv)).string('collectionId').parse() as unknown as { collectionId: string }
  await addCollectionDefaultDiscordGuild(argv.collectionId)
  await terminateFirestore()
})()
