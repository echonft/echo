import { getNftsByAccount } from '@echo/opensea/services/get-nfts-by-account'
import { CHAIN_ETHEREUM } from '@echo/utils/constants/chains/chains'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { getChains } from '@echo/utils/helpers/get-chains'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { ChainName } from '@echo/utils/types/chain-name'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { forEach } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -a  string              address
 *  -c  string (optional)   chain name (defaults to 'ethereum')
 *
 *  Fetch the NFTs for a given address from the OpenSea API
 */
void (async function () {
  const { a, c } = await yargs(hideBin(process.argv))
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
        default: CHAIN_ETHEREUM,
        coerce: (arg) => arg as ChainName
      }
    })
    .demandOption('a', 'address is required')
    .parse()

  try {
    const address = formatWalletAddress({ address: a, chain: c })
    pinoLogger.info(`fetching NFTs for ${a}...`)
    try {
      const nfts = await getNftsByAccount({ address, chain: c, fetch })
      pinoLogger.info(`received ${nfts.length} NFTs`)
      forEach((nft) => {
        pinoLogger.info(JSON.stringify(nft, undefined, 2))
      }, nfts)
    } catch (e) {
      pinoLogger.error(`error fetching NFTs for ${a}: ${errorMessage(e)}`)
      pinoLogger.error((e as Error).stack)
    }
  } catch (e) {
    pinoLogger.error(`address ${a} is not a valid address`)
  }
  process.exit()
})()
