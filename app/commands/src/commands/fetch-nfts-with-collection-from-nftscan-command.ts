import type { Command } from '@echo/commands/types/command'
import { getAllNftsByAccount } from '@echo/nft-scan/services/get-all-nfts-by-account'
import { getCollectionByAddress } from '@echo/nft-scan/services/get-collection-by-address'
import { getChains } from '@echo/utils/helpers/chains/get-chains'
import { errorMessage } from '@echo/utils/helpers/error-message'
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
export const fetchNftsWithCollectionFromNftscanCommand: Command = {
  name: 'fetch-nfts-with-collection-from-nftscan',
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
          default: 'ethereum',
          coerce: (arg) => arg as ChainName
        }
      })
      .demandOption('a', 'address is required')
      .parse()

    try {
      const address = pipe(formatWalletAddress, toLower<HexString>)({ address: a, chain: c })
      console.log(`fetching NFTs for ${a}...`)
      try {
        const response = await getAllNftsByAccount({ wallet: { address, chain: c }, fetch })
        console.log(`received NFTs from ${response.length} collections`)
        for (const collection of response) {
          try {
            const collectionResponse = await getCollectionByAddress({ contract: collection.contract, fetch })
            console.log(`-- COLLECTION --`)
            console.log(JSON.stringify(collectionResponse, undefined, 2))
            console.log(`-- NFTs --`)
            forEach((nft) => {
              console.log(JSON.stringify(nft, undefined, 2))
            }, collection.nfts)
          } catch (e) {
            console.error(
              `error fetching collection for contract ${JSON.stringify(
                collection.contract,
                undefined,
                2
              )}: ${errorMessage(e)}`
            )
          }
        }
        console.log(JSON.stringify(response, undefined, 2))
      } catch (e) {
        console.error(`error fetching NFTs for ${a}: ${errorMessage(e)}`)
        console.error((e as Error).stack)
      }
    } catch (e) {
      console.error(`address ${a} is not a valid address`)
      console.error((e as Error).stack)
    }
  }
}
