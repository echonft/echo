import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command } from '@echo/commands/types/command'
import { getAllNftsByAccount } from '@echo/nft-scan/services/get-all-nfts-by-account'
import { getCollectionByAddress } from '@echo/nft-scan/services/get-collection-by-address'
import { getChains } from '@echo/utils/helpers/chains/get-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { assoc, forEach, pipe, toLower } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -a  string              address
 *  -c  string (optional)   chain name (defaults to 'ethereum')
 *
 *  Fetch the NFTs for a given address from the NFTScan API
 */
export const fetchNftsWithCollectionFromNftscanCommand: Command = {
  name: 'fetch-nfts-with-collection-from-nftscan',
  execute: async function () {
    const logger = getLogger().child({ command: 'fetch-nfts-with-collection-from-nftscan' })
    const { a, c } = await yargs(hideBin(process.argv))
      .options({
        a: {
          alias: 'address',
          describe: 'address',
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
      .demandOption('a', 'address is required')
      .parse()

    try {
      const address = pipe(formatWalletAddress, toLower<HexString>)({ address: a, chain: c })
      logger.info({ wallet: { address: a, chain: c } }, 'fetching NFTs')
      try {
        const response = await getAllNftsByAccount({ wallet: { address, chain: c }, fetch, logger })
        logger.info(`received NFTs from ${response.length} collections`)
        for (const collection of response) {
          try {
            const collectionResponse = await getCollectionByAddress({ contract: collection.contract, fetch })
            forEach((nft) => {
              logger.info({ nft: assoc('collection', collectionResponse, nft) })
            }, collection.nfts)
          } catch (err) {
            logger.error({ err, collection }, 'error fetching collection')
          }
        }
      } catch (err) {
        logger.error({ err, wallet: { address: a, chain: c } }, 'error fetching NFTs')
      }
    } catch (err) {
      logger.error({ address: a }, 'not a valid address')
    }
  }
}
