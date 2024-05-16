import { getCollection } from '@echo/opensea/services/get-collection'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -s  string    slug
 *
 *  Fetch the collection for a given slug from the OpenSea API
 */
void (async function () {
  const { s } = await yargs(hideBin(process.argv))
    .options({
      s: {
        alias: 'slug',
        describe: 'collection slug on OpenSea',
        type: 'string'
      }
    })
    .demandOption('s', 'slug is required')
    .parse()
  pinoLogger.info(`fetching collection with slug ${s}...`)
  try {
    const collection = await getCollection({ slug: s, fetch })
    pinoLogger.info(JSON.stringify(collection, undefined, 2))
  } catch (e) {
    pinoLogger.error(`error fetching collection with slug ${s}: ${errorMessage(e)}`)
    pinoLogger.error((e as Error).stack)
  }
  process.exit()
})()
