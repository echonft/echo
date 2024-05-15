import { getNftsByAccount } from '@echo/opensea/services/get-nfts-by-account'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { forEach } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -a  string              address
 *  -c  number (optional)   chain id (default to 1)
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
        describe: 'chain id',
        type: 'number',
        default: 1
      }
    })
    .demandOption('a', 'address is required')
    .parse()

  try {
    const address = formatAddress({ address: a, chainId: c })
    pinoLogger.info(`fetching NFTs for ${a}...`)
    try {
      const nfts = await getNftsByAccount({ address, chainId: c, fetch })
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
