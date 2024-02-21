import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { nftIsApproved } from '@echo/web3/helpers/nft/nft-is-approved'
import { isNil } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  --id (NFT id)
 *
 *  Checks if the approval was given for an NFT
 */
void (async function () {
  const argv = yargs(hideBin(process.argv)).string('id').parse() as unknown as { id: string }
  initializeFirebase()
  const { id } = argv
  const nft = await findNftById(id)
  if (isNil(nft)) {
    pinoLogger.error(`NFT ${id} not found in the database`)
    return
  }
  const approved = await nftIsApproved(nft, pinoLogger)
  if (approved) {
    pinoLogger.info(`NFT ${id} is approved`)
  }
  await terminateFirestore()
  process.exit()
})()
