import type { Wallet } from '@echo/model/types/wallet'
import { getCollectionByAddress } from '@echo/nft-scan/services/get-collection-by-address'
import { CHAIN_ETHEREUM, CHAINS } from '@echo/utils/constants/chains/chains'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
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
        choices: CHAINS,
        default: CHAIN_ETHEREUM,
        coerce: (arg) => arg as ChainName
      }
    })
    .demandOption('a', 'address is required')
    .parse()

  try {
    const address = pipe(formatWalletAddress, toLower<HexString>)({ address: a, chain: c })
    const contract: Wallet = { address, chain: c }
    try {
      const collection = await getCollectionByAddress({ contract: { address, chain: c }, fetch })
      pinoLogger.info(`successfuly received collection: ${JSON.stringify(collection, undefined, 2)}`)
    } catch (e) {
      pinoLogger.error(
        `error fetching collection for contract ${JSON.stringify(contract, undefined, 2)}: ${errorMessage(e)}`
      )
      pinoLogger.error((e as Error).stack)
    }
  } catch (e) {
    pinoLogger.error(`address ${a} is not a valid address`)
  }
  process.exit()
})()
