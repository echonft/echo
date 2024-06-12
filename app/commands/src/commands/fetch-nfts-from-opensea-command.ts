import type { Command } from '@echo/commands/types/command'
import { getNftsByAccount } from '@echo/opensea/services/get-nfts-by-account'
import { getChains } from '@echo/utils/helpers/chains/get-chains'
import { errorMessage } from '@echo/utils/helpers/error-message'
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
export const fetchNftsFromOpenseaCommand: Command = {
  name: 'fetch-nfts-from-opensea',
  execute: async function () {
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
      const address = formatWalletAddress({ address: a, chain: c })
      console.log(`fetching NFTs for ${a}...`)
      try {
        const nfts = await getNftsByAccount({ address, chain: c, fetch })
        console.log(`received ${nfts.length} NFTs`)
        forEach((nft) => {
          console.log(JSON.stringify(nft, undefined, 2))
        }, nfts)
      } catch (e) {
        console.error(`error fetching NFTs for ${a}: ${errorMessage(e)}`)
        console.error((e as Error).stack)
      }
    } catch (e) {
      console.error(`address ${a} is not a valid address`)
    }
  }
}
