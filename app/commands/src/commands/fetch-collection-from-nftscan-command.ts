import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command } from '@echo/commands/types/command'
import type { Wallet } from '@echo/model/types/wallet'
import { getCollectionByAddress } from '@echo/nft-scan/services/get-collection-by-address'
import { getChains } from '@echo/utils/helpers/chains/get-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { pipe, toLower } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -a  string              address
 *  -c  string (optional)   chain name (defaults to 'ethereum')
 *
 *  Fetch an NFT for a given address + token id from the NFTScan API
 */
export const fetchCollectionFromNftscanCommand: Command = {
  name: 'fetch-collection-from-nftscan',
  execute: async function () {
    const logger = getLogger().child({ command: 'fetch-collection-from-nftscan' })
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
      const contract: Wallet = { address, chain: c }
      try {
        const collection = await getCollectionByAddress({ contract: { address, chain: c }, fetch, logger })
        logger.info({ collection }, 'successfuly received collection')
      } catch (err) {
        logger.error(
          {
            contract,
            err
          },
          'error fetching collection'
        )
      }
    } catch (e) {
      logger.error({ address: a }, 'not a valid address')
    }
  }
}
