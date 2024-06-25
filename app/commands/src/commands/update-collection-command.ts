import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command, CommandName } from '@echo/commands/types/command'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { updateCollection } from '@echo/tasks/update-collection'
import { getChains } from '@echo/utils/helpers/chains/get-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { pipe, toLower } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const name: CommandName = 'update-collection'
/**
 * Arguments:
 *  -a  string              address
 *  -c  string (optional)   chain name (defaults to 'ethereum')
 */
export const updateCollectionCommand: Command = {
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
      const address = pipe(formatWalletAddress, toLower<HexString>)({ address: a, chain: c })
      try {
        await initializeFirebase()
        await updateCollection({ contract: { address, chain: c }, logger })
      } catch (err) {
        logger.error({ err, collection: { contract: { address, chain: c } } }, 'error updating collection')
      }
    } catch (err) {
      logger.error({ address: a }, 'not a valid address')
    }
  }
}
