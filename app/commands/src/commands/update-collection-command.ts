import { updateCollection as updateCollectionInFirestore } from '@echo/firestore/crud/collection/update-collection'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { getCollection } from '@echo/opensea/services/get-collection'
import { isTestnet } from '@echo/utils/constants/is-testnet'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { assoc, pipe, toLower } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -s  string  collection slug
 */
void (async function () {
  const { s } = await yargs(hideBin(process.argv))
    .options({
      s: {
        alias: 'slug',
        describe: 'collection slug',
        type: 'string'
      }
    })
    .demandOption('s', 'collection slug is required')
    .parse()
  const slug = toLower(s)
  try {
    initializeFirebase()
    const collection = await pipe(assoc('fetch', fetch), getCollection)({ slug, testnet: isTestnet })
    await updateCollectionInFirestore({ slug, data: collection })
    await terminateFirestore()
  } catch (err) {
    pinoLogger.error(`error updating collection ${slug}: ${errorMessage(err)}`)
  }
  process.exit()
})()
