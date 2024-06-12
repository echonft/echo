import type { Command } from '@echo/commands/types/command'
import { getCollection } from '@echo/opensea/services/get-collection'
import { getChains } from '@echo/utils/helpers/chains/get-chains'
import { errorMessage } from '@echo/utils/helpers/error-message'
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
    console.log(`fetching collection with slug ${s}...`)
    try {
      // TODO add logger
      const collection = await getCollection({ fetch, slug: s, chain: c })
      console.log(JSON.stringify(collection, undefined, 2))
    } catch (e) {
      console.error(`error fetching collection with slug ${s}: ${errorMessage(e)}`)
      console.error((e as Error).stack)
    }
  }
}
