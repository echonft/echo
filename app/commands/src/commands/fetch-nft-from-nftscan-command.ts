import { getNft } from '@echo/nft-scan/services/get-nft'
import { CHAIN_ETHEREUM } from '@echo/utils/constants/chains/chains'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { getChains } from '@echo/utils/helpers/get-chains'
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
void (async function () {
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
        default: CHAIN_ETHEREUM,
        coerce: (arg) => arg as ChainName
      }
    })
    .options({
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
      const nft = await getNft({ contract: { address, chain: c }, fetch, identifier: t })
      console.log(`successfuly received NFT: ${JSON.stringify(nft, undefined, 2)}`)
    } catch (e) {
      console.error(`error fetching NFT #${t} for ${a}: ${errorMessage(e)}`)
      console.error((e as Error).stack)
    }
  } catch (e) {
    console.error(`address ${a} is not a valid address`)
  }
  process.exit()
})()
