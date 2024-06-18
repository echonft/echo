import { getLogger } from '@echo/commands/helpers/get-logger'
import type { Command } from '@echo/commands/types/command'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { nftIsApproved } from '@echo/web3/helpers/nft/nft-is-approved'
import { isNil } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -i  string  NFT id
 *
 *  Checks if the approval was given for an NFT
 */
export const checkNftApprovalCommand: Command = {
  name: 'check-nft-approval',
  execute: async function () {
    const logger = getLogger().child({ command: 'check-nft-approval' })
    const { i } = await yargs(hideBin(process.argv))
      .options({
        i: {
          alias: 'id',
          describe: 'NFT id',
          type: 'string'
        }
      })
      .demandOption('i', 'NFT id is required')
      .parse()
    await initializeFirebase()
    const nft = await getNftById(i)
    if (isNil(nft)) {
      logger.error({ nft: { tokenId: i } }, 'NFT not found in the database')
      return
    }
    const approved = await nftIsApproved(nft, console)
    if (approved) {
      logger.info({ nft: { tokenId: i } }, 'NFT is approved')
    }
  }
}
