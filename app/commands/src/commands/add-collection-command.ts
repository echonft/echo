import { addCollection } from '@echo/commands/tasks/add-collection'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -chainId number
 *  -address string
 *  -overrideChainId?  number
 *  -overrideAddress?  string
 *
 *  If override parameters are set, it will be fetched with the chainId and address arguments from Alchemy,
 *  but these parameters will be overriden in the database by the ones supplied.
 *  It's useful when adding collections on the testnet - we get the metadata from mainnet, but keep the contract info
 *  from testnet.
 */
void (async function () {
  const argv = await yargs(hideBin(process.argv))
    .options({
      chainId: {
        describe: 'chain id',
        type: 'number'
      },
      address: {
        describe: 'address',
        type: 'string'
      },
      overrideChainId: {
        describe: 'chain id to set in the database',
        type: 'number'
      },
      overrideAddress: {
        describe: 'address to set in the database',
        type: 'string'
      }
    })
    .demandOption('chainId', 'chain id is required')
    .demandOption('address', 'address is required')
    .parse()
  initializeFirebase()
  await addCollection(argv)
  await terminateFirestore()
  process.exit()
})()
