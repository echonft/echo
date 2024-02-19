import { addCollection } from '@echo/commands/tasks/add-collection'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { HexString } from '@echo/utils/types/hex-string'
import * as fs from 'fs/promises'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

interface AddCollectionsFile {
  chainId: number
  collections: {
    address: HexString
    override?: {
      address: HexString
    }
  }[]
  override?: {
    chainId: number
  }
}
/**
 * Add multiple collections from a JSON file. See AddCollectionsFile interface for the structure of the file.
 *
 * Arguments:
 *  --path - path to JSON file
 */
void (function () {
  const argv = yargs(hideBin(process.argv)).string('path').parse() as unknown as { path: string }
  if (isNilOrEmpty(argv.path)) {
    pinoLogger.error(`path is not specified`)
  }
  initializeFirebase()
  fs.readFile(argv.path, 'utf-8')
    .then(async (text) => {
      try {
        const data = JSON.parse(text) as AddCollectionsFile
        const overrideChainId = data.override?.chainId
        const chainId = data.chainId
        const collections = data.collections
        for (const collection of collections) {
          try {
            await addCollection({
              chainId,
              overrideChainId,
              address: collection.address,
              overrideAddress: collection.override?.address
            })
          } catch (err) {
            pinoLogger.error(`Error adding collection ${JSON.stringify(collection)}: ${errorMessage(err)}`)
          }
        }
      } catch (err) {
        pinoLogger.error(`Wrong JSON data: ${errorMessage(err)}`)
      } finally {
        await terminateFirestore()
        process.exit()
      }
    })
    .catch((err) => {
      pinoLogger.error(`Error reading collections file from ${argv.path}: ${errorMessage(err)}`)
      process.exit()
    })
})()
