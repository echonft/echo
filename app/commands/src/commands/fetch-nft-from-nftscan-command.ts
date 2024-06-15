import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command } from '@echo/commands/types/command'
import { getNft } from '@echo/nft-scan/services/get-nft'
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
 *  -t  string              tokenId
 *
 *  Fetch an NFT for a given address + token id from the NFTScan API
 */
export const fetchNftFromNftscanCommand: Command = {
  name: 'fetch-nft-from-nftscan',
  execute: async function () {
    const logger = getLogger().child({ command: 'fetch-nft-from-nftscan' })
    const { a, c, t } = await yargs(hideBin(process.argv))
      .options({
        a: {
          alias: 'address',
          describe: 'address',
          type: 'string'
        }
      })
      .options({
        c: {
          alias: 'chain',
          describe: 'chain',
          type: 'string',
          choices: getChains(),
          default: 'ethereum',
          coerce: (arg) => arg as ChainName
        },
        t: {
          alias: 'tokenId',
          describe: 'token id',
          type: 'string'
        }
      })
      .demandOption('a', 'address is required')
      .demandOption('t', 'token id is required')
      .parse()

    try {
      const address = pipe(formatWalletAddress, toLower<HexString>)({ address: a, chain: c })
      try {
        const nft = await getNft({ contract: { address, chain: c }, fetch, identifier: t, logger })
        logger.info({ nft }, 'successfuly received NFT')
      } catch (err) {
        logger.error(
          { err, nft: { tokenId: t, collection: { contract: { address: a, chain: c } } } },
          'error fetching NFT'
        )
      }
    } catch (e) {
      logger.error({ address: a }, 'not a valid address')
    }
  }
}
