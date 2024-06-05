import type { Command } from '@echo/commands/types/command'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
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
    initializeFirebase()
    const nft = await getNftById(i)
    if (isNil(nft)) {
      console.error(`NFT ${i} not found in the database`)
      return
    }
    const approved = await nftIsApproved(nft, console)
    if (approved) {
      console.log(`NFT ${i} is approved`)
    }
    await terminateFirestore()
  }
}
