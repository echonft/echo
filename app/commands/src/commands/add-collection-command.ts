import { addCollection, type AddCollectionArgs } from '@echo/commands/tasks/add-collection'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  --chainId
 *  --address
 *  --overrideChainId (optional)
 *  --overrideAddress (optional)
 *
 *  If override parameters are set, it will be fetched with the chainId and address arguments from Alchemy,
 *  but these parameters will be overriden in the database by the ones supplied.
 *  It's useful when adding collections on the testnet - we get the metadata from mainnet, but keep the contract info
 *  from testnet.
 */
void (async function () {
  const argv = yargs(hideBin(process.argv))
    .string('address')
    .string('overrideAddress')
    .parse() as unknown as AddCollectionArgs
  initializeFirebase()
  await addCollection(argv)
  await terminateFirestore()
})()
