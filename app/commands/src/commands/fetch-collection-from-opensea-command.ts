import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command } from '@echo/commands/types/command'
import { getCollection } from '@echo/opensea/services/get-collection'
import { getChains } from '@echo/utils/helpers/chains/get-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -s  string   slug
 *  -c  string (optional)   chain name (defaults to 'ethereum')
 *
 *  Fetch the collection for a given slug from the OpenSea API
 */
export const fetchCollectionFromOpenseaCommand: Command = {
  name: 'fetch-collection-from-opensea',
  execute: async function () {
    const logger = getLogger().child({ command: 'fetch-collection-from-opensea' })
    const { s, c } = await yargs(hideBin(process.argv))
      .options({
        s: {
          alias: 'slug',
          describe: 'collection slug on OpenSea',
          type: 'string'
        },
        c: {
          alias: 'chain',
          describe: 'chain',
          type: 'string',
          choices: getChains(),
          default: 'ethereum',
          coerce: (arg) => arg as ChainName
        }
      })
      .demandOption('s', 'slug is required')
      .parse()
    logger.info({ collection: { slug: s } }, 'fetching collection')
    try {
      const collection = await getCollection({ fetch, slug: s, chain: c, logger })
      logger.info({ collection })
    } catch (err) {
      logger.error({ err, collection: { slug: s } }, 'error fetching collection')
    }
  }
}
