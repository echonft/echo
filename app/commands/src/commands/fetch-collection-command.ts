import { getCollection } from '@echo/opensea/services/get-collection'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -s  string    slug
 *  -t  boolean   testnet (defaults to false)
 *
 *  Fetch the collection for a given slug from the OpenSea API
 */
void (async function () {
  const { s, t } = await yargs(hideBin(process.argv))
    .options({
      s: {
        alias: 'slug',
        describe: 'collection slug on OpenSea',
        type: 'string'
      },
      t: {
        alias: 'testnet',
        describe: 'fetch on testnets?',
        type: 'boolean',
        default: false
      }
    })
    .demandOption('s', 'slug is required')
    .parse()
  pinoLogger.info(`fetching collection with slug ${s}...`)
  try {
    const collection = await getCollection({ fetch, slug: s, testnet: t })
    pinoLogger.info(JSON.stringify(collection, undefined, 2))
  } catch (e) {
    pinoLogger.error(`error fetching collection with slug ${s}: ${errorMessage(e)}`)
    pinoLogger.error((e as Error).stack)
  }
  process.exit()
})()
