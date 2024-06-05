import type { Command } from '@echo/commands/types/command'
import { getCollection } from '@echo/opensea/services/get-collection'
import { errorMessage } from '@echo/utils/helpers/error-message'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -s  string    slug
 *  -t  boolean   testnet (defaults to false)
 *
 *  Fetch the collection for a given slug from the OpenSea API
 */
export const fetchCollectionFromOpenseaCommand: Command = {
  name: 'fetch-collection-from-opensea',
  execute: async function () {
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
    console.log(`fetching collection with slug ${s}...`)
    try {
      const collection = await getCollection({ fetch, slug: s, testnet: t })
      console.log(JSON.stringify(collection, undefined, 2))
    } catch (e) {
      console.error(`error fetching collection with slug ${s}: ${errorMessage(e)}`)
      console.error((e as Error).stack)
    }
  }
}
