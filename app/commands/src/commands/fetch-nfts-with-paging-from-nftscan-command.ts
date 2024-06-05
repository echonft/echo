import type { Command } from '@echo/commands/types/command'
import { getNftsByAccount } from '@echo/nft-scan/services/get-nfts-by-account'
import { CHAIN_ETHEREUM } from '@echo/utils/constants/chains/chains'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { getChains } from '@echo/utils/helpers/get-chains'
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
 *  Fetch the NFTs for a given address from the NFTScan API
 */
export const fetchNftsWithPagingFromNftscanCommand: Command = {
  name: 'fetch-nfts-with-paging-from-nftscan',
  execute: async function () {
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
      const address = pipe(formatWalletAddress, toLower<HexString>)({ address: a, chain: c })
      console.log(`fetching NFTs for ${a}...`)
      try {
        const response = await getNftsByAccount({ wallet: { address, chain: c }, fetch })
        console.log(`received ${response.length} NFTs`)
        forEach((nft) => {
          console.log(JSON.stringify(nft, undefined, 2))
        }, response)
      } catch (e) {
        console.error(`error fetching NFTs for ${a}: ${errorMessage(e)}`)
        console.error((e as Error).stack)
      }
    } catch (e) {
      console.error(`address ${a} is not a valid address`)
    }
  }
}
