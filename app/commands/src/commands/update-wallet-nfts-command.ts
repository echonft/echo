import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command, CommandName } from '@echo/commands/types/command'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { updateNftsForWallet } from '@echo/tasks/update-nfts-for-wallet'
import { getChains } from '@echo/utils/helpers/chains/get-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { isNil, pipe, toLower } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const name: CommandName = 'update-wallet-nfts'
/**
 * Arguments:
 *  -a  string              address
 *  -c  string (optional)   chain name (defaults to 'ethereum')
 *  Updates all the NFTs of a given wallet
 */
export const updateWalletNftsCommand: Command = {
  name,
  execute: async function () {
    const logger = getLogger().child({ command: name })
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
      await initializeFirebase()
      const address = pipe(formatWalletAddress, toLower<HexString>)({ address: a, chain: c })
      const wallet = await getWalletByAddress({ address, chain: c })
      if (isNil(wallet)) {
        logger.error({ wallet: { address, chain: c } }, 'wallet not found')
        return
      }
      logger.info({ wallet }, 'Updating wallet NFTs')
      try {
        await updateNftsForWallet({ wallet, logger })
        logger.info({ wallet }, 'Done updating wallet NFTs')
      } catch (err) {
        logger.error({ err, wallet: { address, chain: c } }, 'error updating wallet NFT')
      }
    } catch (err) {
      logger.error({ err, address: a }, 'not a valid address')
    }
  }
}
