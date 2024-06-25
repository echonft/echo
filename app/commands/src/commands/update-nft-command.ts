import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command, CommandName } from '@echo/commands/types/command'
import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getNft } from '@echo/opensea/services/get-nft'
import { getChains } from '@echo/utils/helpers/chains/get-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { isNil, pipe, toLower } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const name: CommandName = 'update-nft'
/**
 * Arguments:
 *  -a  string              address
 *  -t  string              tokenId
 *  -c  string (optional)   chain name (defaults to 'ethereum')
 *
 *  Fetch the NFT for a given contract address and a tokenId from the OpenSea API and update it in the db
 */
export const updateNftCommand: Command = {
  name,
  execute: async function () {
    const logger = getLogger().child({ command: name })
    const { a, c, t } = await yargs(hideBin(process.argv))
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
        },
        t: {
          alias: 'token',
          describe: 'token id',
          type: 'string'
        }
      })
      .demandOption('a', 'address is required')
      .demandOption('t', 'token id is required')
      .parse()

    try {
      const address = pipe(formatWalletAddress, toLower<HexString>)({ address: a, chain: c })
      logger.info({ nft: { collection: { contract: { address, chain: c } }, tokenId: t } }, 'fetching NFT')
      try {
        await initializeFirebase()
        const nft = await getNft({ contract: { address, chain: c }, identifier: t, fetch, logger })
        if (isNil(nft)) {
          logger.error('did not get any result')
          return
        }
        await updateNft(nft)
        logger.info({ nft }, 'updated NFT')
      } catch (err) {
        logger.error(
          { err, nft: { collection: { contract: { address, chain: c } }, tokenId: t } },
          `error updating NFT`
        )
      }
    } catch (err) {
      logger.error({ address: a }, 'not a valid address')
    }
  }
}
