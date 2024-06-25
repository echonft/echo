import type { Command, CommandName } from '@echo/commands/types/command'
import { addCollectionDiscordGuild } from '@echo/firestore/crud/collection-discord-guild/add-collection-discord-guild'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getEchoDiscordGuild } from '@echo/utils/helpers/get-echo-discord-guild'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const name: CommandName = 'add-collection-guild'
/**
 * Arguments:
 *  -i  string  collection id
 *
 *  Adds the default (Echo) DiscordGuild to a collection. It's already done in the addCollection command,
 *  but it cases where collections were added without the command, it can be useful.
 */
export const addCollectionGuildCommand: Command = {
  name,
  execute: async function () {
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
    await initializeFirebase()
    await addCollectionDefaultDiscordGuild(i)
  }
}

async function addCollectionDefaultDiscordGuild(collectionId: string) {
  const echoGuild = getEchoDiscordGuild()
  await addCollectionDiscordGuild({ collectionId, guild: echoGuild })
}
