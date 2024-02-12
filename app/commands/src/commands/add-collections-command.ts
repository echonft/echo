import { addCollection } from '@echo/commands/tasks/add-collection'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
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
    logger.error(`path is not specified`)
  }
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
            logger.error(`Error adding collection ${JSON.stringify(collection)}: ${errorMessage(err)}`)
          }
        }
        await terminateFirestore()
      } catch (err) {
        logger.error(`Wrong JSON data: ${errorMessage(err)}`)
      }
    })
    .catch((err) => {
      logger.error(`Error reading collections file from ${argv.path}: ${errorMessage(err)}`)
    })
})()
