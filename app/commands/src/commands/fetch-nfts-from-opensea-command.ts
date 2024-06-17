import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command } from '@echo/commands/types/command'
import { getNftsByAccount } from '@echo/opensea/services/get-nfts-by-account'
import { getChains } from '@echo/utils/helpers/chains/get-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { forEach, pipe, toLower } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -a  string              address
 *  -c  string (optional)   chain name (defaults to 'ethereum')
 *
 *  Fetch the NFTs for a given address from the OpenSea API
 */
export const fetchNftsFromOpenseaCommand: Command = {
  name: 'fetch-nfts-from-opensea',
  execute: async function () {
    const logger = getLogger().child({ command: 'fetch-nfts-from-opensea' })
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
        const nfts = await getNftsByAccount({ wallet: { address, chain: c }, fetch, logger })
        logger.info(`received ${nfts.length} NFTs`)
        forEach((nft) => {
          logger.info({ nft })
        }, nfts)
      } catch (err) {
        logger.error({ err, wallet: { address: a, chain: c } }, 'error fetching NFTs')
      }
    } catch (e) {
      logger.error({ address: a }, 'not a valid address')
    }
  }
}
