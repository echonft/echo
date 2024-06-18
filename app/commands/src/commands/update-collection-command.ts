import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command } from '@echo/commands/types/command'
import { updateCollection as updateCollectionInFirestore } from '@echo/firestore/crud/collection/update-collection'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getCollection } from '@echo/opensea/services/get-collection'
import { getChains } from '@echo/utils/helpers/chains/get-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import { assoc, pipe, toLower } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// TODO add chain
/**
 * Arguments:
 *  -s  string  collection slug
 *  -c  string (optional)   chain name (defaults to 'ethereum')
 */
export const updateCollectionCommand: Command = {
  name: 'update-collection',
  execute: async function () {
    const logger = getLogger().child({ command: 'update-collection' })
    const { c, s } = await yargs(hideBin(process.argv))
      .options({
        c: {
          alias: 'chain',
          describe: 'chain',
          type: 'string',
          choices: getChains(),
          default: 'ethereum',
          coerce: (arg) => arg as ChainName
        },
        s: {
          alias: 'slug',
          describe: 'collection slug',
          type: 'string'
        }
      })
      .demandOption('s', 'collection slug is required')
      .parse()
    const slug = toLower(s)
    try {
      await initializeFirebase()
      const collection = await pipe(assoc('fetch', fetch), getCollection)({ slug, chain: c, logger })
      await updateCollectionInFirestore({ slug, data: collection })
    } catch (err) {
      logger.error({ err, collection: { slug } }, 'error updating collection')
    }
  }
}
