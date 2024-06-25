import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command, CommandName } from '@echo/commands/types/command'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { updateNftsForUser } from '@echo/tasks/update-nfts-for-user'
import { isNil } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const name: CommandName = 'update-user-nfts'
/**
 *  Updates all the NFTs for a given user
 *  Arguments:
 *    -u  string    username
 */
export const updateUserNftsCommand: Command = {
  name,
  execute: async function () {
    const logger = getLogger({
      override: {
        level: 'error'
      }
    }).child({ command: name })
    const { u } = await yargs(hideBin(process.argv))
      .options({
        u: {
          alias: 'username',
          describe: 'username',
          type: 'string'
        }
      })
      .demandOption('u', 'username is required')
      .parse()
    try {
      await initializeFirebase()
      const user = await getUserByUsername(u)
      if (isNil(user)) {
        logger.error({ user: { username: u } }, 'user not found')
        return
      }
      try {
        await updateNftsForUser({ user, logger })
      } catch (err) {
        logger.error({ err, user }, 'error upating user NFTs')
      }
    } catch (err) {
      logger.error({ err, user: { username: u } }, 'error updating user NFT')
    }
  }
}
